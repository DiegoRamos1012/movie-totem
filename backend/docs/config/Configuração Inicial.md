# Configuração Inicial do Backend

Este documento descreve os passos mínimos para preparar e rodar o backend localmente.

Pré-requisitos

- Node.js e pnpm instalados.
- PostgreSQL em execução e acessível.

Passo 1 — Instalar dependências

- Execute:
  ```bash
  pnpm i
  ```

Passo 2 — Criar arquivo .env

- Crie uma cópia do arquivo de exemplo e edite as variáveis de ambiente:
  - Unix / macOS:
    ```bash
    cp .env.example .env
    ```
  - Windows (PowerShell):
    ```powershell
    Copy-Item .env.example .env
    ```
    Depois, edite `.env` para ajustar `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` e `DB_NAME`.

Passo 3 — Verificar banco de dados

- Certifique-se de que o serviço PostgreSQL esteja em execução e que as credenciais no `.env` estejam corretas.

Passo 4 — Gerar e aplicar migrations (TypeORM)

- Gerar migration (opcional se já existir):
  ```bash
  pnpm typeorm migration:generate ./src/migrations/InitialMigration -d ./src/config/database.ts
  ```
- Aplicar migrations:
  ```bash
  pnpm run migration:run
  ```

Passo 5 — Executar em modo de desenvolvimento

- Iniciar servidor:
  ```bash
  pnpm run dev
  ```
- Verifique os logs para confirmar a conexão com o banco de dados e o status do servidor.

Notas

- As portas e credenciais usadas ficam no arquivo `.env`.
- Se houver erros de conexão, verifique firewall, usuário/senha e se o banco aceita conexões TCP.
