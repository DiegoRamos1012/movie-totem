import "reflect-metadata";
import { Snack, SnackCategory } from "../models/Snack.js";
import { DataSource } from "typeorm";

export async function seedSnacks(dataSource: DataSource) {
  const snackRepository = dataSource.getRepository(Snack);

  const snacks: any[] = [
    {
      name: "Pipoca Salgada Média",
      description:
        "Clássica pipoca salgada, crocante e quentinha, feita na hora.",
      category: SnackCategory.PIPOCA,
      size: "Média",
      price: 18,
      imageUrl: "https://example.com/pipoca-salgada-media.jpg",
      ingredients: "Milho de pipoca, óleo vegetal, sal.",
      allergens: "Pode conter traços de soja.",
      available: true,
      stockQuantity: 100,
      isCombo: false,
      active: true,
    },
    {
      name: "Pipoca Doce Caramelo",
      description: "Pipoca caramelizada artesanalmente, crocante e saborosa.",
      category: SnackCategory.PIPOCA,
      size: "Grande",
      price: 22,
      imageUrl: "https://example.com/pipoca-caramelo.jpg",
      ingredients: "Milho de pipoca, açúcar, manteiga, essência de baunilha.",
      allergens: "Contém lactose.",
      available: true,
      stockQuantity: 60,
      isCombo: false,
      active: true,
    },
    {
      name: "Refrigerante 700ml",
      description:
        "Refrigerante gelado, disponível nos sabores cola, guaraná ou laranja.",
      category: SnackCategory.BEBIDA,
      size: "700ml",
      price: 12,
      imageUrl: "https://example.com/refrigerante.jpg",
      ingredients: "Água gaseificada, açúcar, aromatizantes.",
      allergens: "Nenhum.",
      available: true,
      stockQuantity: 80,
      isCombo: false,
      active: true,
    },
    {
      name: "Água Mineral",
      description:
        "Água mineral natural, sem gás, perfeita para acompanhar qualquer lanche.",
      category: SnackCategory.BEBIDA,
      size: "500ml",
      price: 8,
      imageUrl: "https://example.com/agua.jpg",
      ingredients: "Água mineral natural.",
      allergens: "Nenhum.",
      available: true,
      stockQuantity: 120,
      isCombo: false,
      active: true,
    },
    {
      name: "Chocolate ao Leite",
      description: "Barra de chocolate ao leite cremoso, 45g.",
      category: SnackCategory.DOCE,
      size: "45g",
      price: 7.5,
      imageUrl: "https://example.com/chocolate.jpg",
      ingredients: "Açúcar, leite em pó, manteiga de cacau, massa de cacau.",
      allergens: "Contém leite e derivados.",
      available: true,
      stockQuantity: 50,
      isCombo: false,
      active: true,
    },
    {
      name: "Jujuba Colorida",
      description: "Pacote de jujubas macias e açucaradas, 80g.",
      category: SnackCategory.DOCE,
      size: "80g",
      price: 6.5,
      imageUrl: "https://example.com/jujuba.jpg",
      ingredients: "Açúcar, gelatina, corantes artificiais.",
      allergens: "Pode conter traços de glúten.",
      available: true,
      stockQuantity: 40,
      isCombo: false,
      active: true,
    },
    {
      name: "Combo Clássico",
      description: "Pipoca salgada média + refrigerante 700ml.",
      category: SnackCategory.COMBO,
      size: "",
      price: 26,
      imageUrl: "https://example.com/combo-classico.jpg",
      ingredients: "Milho de pipoca, óleo vegetal, sal, refrigerante.",
      allergens: "Pode conter traços de soja.",
      available: true,
      stockQuantity: 50,
      isCombo: true,
      comboItems: JSON.stringify([
        "Pipoca Salgada Média",
        "Refrigerante 700ml",
      ]),
      discountPercentage: 10,
      active: true,
    },
    {
      name: "Combo Doce",
      description: "Pipoca doce caramelo + chocolate ao leite + água mineral.",
      category: SnackCategory.COMBO,
      size: "",
      price: 30,
      imageUrl: "https://example.com/combo-doce.jpg",
      ingredients: "Milho, açúcar, manteiga, leite, água mineral.",
      allergens: "Contém leite e derivados.",
      available: true,
      stockQuantity: 40,
      isCombo: true,
      comboItems: JSON.stringify([
        "Pipoca Doce Caramelo",
        "Chocolate ao Leite",
        "Água Mineral",
      ]),
      discountPercentage: 12.5,
      active: true,
    },
    {
      name: "Energético Lata",
      description: "Energético 250ml para dar aquele impulso de energia.",
      category: SnackCategory.BEBIDA,
      size: "250ml",
      price: 14,
      imageUrl: "https://example.com/energetico.jpg",
      ingredients: "Cafeína, taurina, vitaminas B, açúcar, água gaseificada.",
      allergens: "Nenhum.",
      available: true,
      stockQuantity: 30,
      isCombo: false,
      active: true,
    },
    {
      name: "Pipoca Gourmet Chocolate",
      description:
        "Deliciosa pipoca coberta com chocolate belga e toque crocante.",
      category: SnackCategory.PIPOCA,
      size: "Grande",
      price: 24,
      imageUrl: "https://example.com/pipoca-chocolate.jpg",
      ingredients: "Milho, chocolate, manteiga, açúcar.",
      allergens: "Contém leite e derivados.",
      available: true,
      stockQuantity: 30,
      isCombo: false,
      active: true,
    },
  ];

  for (const s of snacks) {
    const existing = await snackRepository.findOne({
      where: { name: (s as any).name },
    });
    if (existing) {
      snackRepository.merge(existing, s);
      await snackRepository.save(existing);
    } else {
      await snackRepository.save(snackRepository.create(s));
    }
  }

  console.log("✅ 10 snacks inseridos ou atualizados com sucesso!");
}
