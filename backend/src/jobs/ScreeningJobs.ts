import { ScreeningService } from "../services/ScreeningService.js";
import chalk from "chalk";

export class ScreeningJobs {
  private screeningService = new ScreeningService();

  /* Job para desativar sessões que passaram da tolerância */
  async deactivateExpiredScreenings(): Promise<void> {
    try {
      const now = new Date();
      console.log(
        chalk.blue(
          `🤖 [${now.toLocaleString("pt-BR")}] Verificando sessões expiradas...`
        )
      );

      const deactivatedCount =
        await this.screeningService.deactivateExpiredScreenings();

      if (deactivatedCount > 0) {
        console.log(chalk.yellow(`⚡ ${deactivatedCount} sessões desativadas`));
      } else {
        console.log(chalk.green("✅ Nenhuma sessão foi desativada"));
      }
    } catch (error) { 
      console.error(chalk.red(`❌ Erro no job de desativação: ${error}`));
    }
  }
}
