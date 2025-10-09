import { AppDataSource } from "../config/database.js";
import { Snack } from "../models/Snack.js";

export class SnackService {
  private snackRepository = AppDataSource.getRepository(Snack);

  /* Lista todos os snacks disponíveis */
  async findAll(): Promise<Snack[]> {
    return await this.snackRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        size: true,
        price: true,
        imageUrl: true,
        calories: true,
        ingredients: true,
        allergens: true,
        isCombo: true,
        comboItems: true,
        discountPercentage: true,
        available: true,
      },
      where: { active: true, available: true },
      order: { category: "ASC" },
    });
  }

  /* Busca snack por ID */
  async findById(id: number): Promise<Snack | null> {
    return await this.snackRepository.findOne({
      where: { id },
    });
  }

  /* Cria novo snack */
  async create(snackData: Partial<Snack>): Promise<Snack> {
    const snack = this.snackRepository.create(snackData);
    const saved = await this.snackRepository.save(snack);
    console.log(`✅ Snack criado: ${saved.name} (ID: ${saved.id})`);
    return saved;
  }

  /* Atualiza snack existente */
  async update(id: number, snackData: Partial<Snack>): Promise<boolean> {
    const snack = await this.findById(id);

    if (!snack) {
      console.log(`⚠️ Tentativa de atualizar snack inexistente (ID: ${id})`);
      return false;
    }

    const result = await this.snackRepository.update(id, snackData);

    if (result.affected !== 0) {
      console.log(`✅ Snack atualizado: ${snack.name} (ID: ${id})`);
      return true;
    }

    return false;
  }

  /* Desativa snack */
  async deactivate(id: number): Promise<boolean> {
    const snack = await this.findById(id);

    if (!snack) {
      console.log(`⚠️ Tentativa de desativar snack inexistente (ID: ${id})`);
      return false;
    }

    const result = await this.snackRepository.update(id, { active: false });

    if (result.affected !== 0) {
      console.log(`🔴 Snack desativado: ${snack.name} (ID: ${id})`);
      return true;
    }

    return false;
  }

  /* Atualiza estoque */
  async updateStock(id: number, quantity: number): Promise<boolean> {
    const snack = await this.findById(id);

    if (!snack) {
      console.log(
        `⚠️ Tentativa de atualizar estoque de snack inexistente (ID: ${id})`
      );
      return false;
    }

    const result = await this.snackRepository.update(id, {
      stockQuantity: quantity,
      available: quantity > 0,
    });

    if (result.affected !== 0) {
      const status = quantity > 0 ? "disponível" : "indisponível";
      console.log(
        `📦 Estoque atualizado: ${snack.name} (ID: ${id}) - ${quantity} unidades (${status})`
      );
      return true;
    }

    return false;
  }

  async purchaseSnack(id: number, quantity: number): Promise<boolean> {
    const snack = await this.findById(id);

    // 1 - Busca o item
    if (!snack) {
      console.log(`⚠️ Tentativa de comprar snack inexistente (ID: ${id})`);
      return false;
    }
    // 2 - Verifica se o item existe (null/undefined)
    if (!snack.active || !snack.available) {
      console.log(
        `⚠️ Snack indisponível para compra: ${snack.name} (ID: ${id})`
      );
      return false;
    }

    // 3 - Agora o TypeScript sabe que o item não é null, então pode acessar snack.active e snack.available
    if (snack.stockQuantity < quantity) {
      console.log(
        `⚠️ Estoque insuficiente: ${snack.name} (Disponível: ${snack.stockQuantity}, Solicitado: ${quantity})`
      );
      return false;
    }

    const newQuantity = snack.stockQuantity - quantity;

    const result = await this.snackRepository.update(id, {
      stockQuantity: newQuantity,
      available: newQuantity > 0,
    });

    if (result.affected !== 0) {
      const status = newQuantity > 0 ? "disponível" : "ESGOTADO";
      console.log(`🛒 Compra processada: ${snack.name} (ID: ${id})`);
      console.log(`   └─ Quantidade comprada: ${quantity}`);
      console.log(`   └─ Estoque restante: ${newQuantity} (${status})`);
      return true;
    }

    return false;
  }
}
