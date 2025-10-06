# Node_Modules e Pnpm-store

No início do projeto havia apenas a pasta `node_modules`, mas surgiram erros ao executar o servidor devido ao mecanismo de instalação do pnpm. Este documento explica o problema, a solução aplicada e os benefícios obtidos.

## Problema inicial

- **Erro observado**: `Cannot find module 'on-finished'` (Express falhando ao resolver módulos).
- **Causa**: pnpm usa uma estrutura não-plana (symlinks) por padrão, o que pode quebrar ferramentas que esperam dependências "hoisted".

## Solução aplicada

- Adição de um arquivo `.npmrc` com configurações para compatibilidade e performance.

Exemplo de `.npmrc` usado:

```properties
# filepath: c:\Users\Windows\movie-totem\backend\.npmrc
# pnpm otimizado para Node + TypeScript + Express + TypeORM

# Usar linkagem "hoisted" para compatibilidade com ferramentas que não lidam bem com links simbólicos profundos
node-linker=hoisted

# Salvar versões exatas das dependências
save-exact=true

# Usar store local para cache e performance
store-dir=.pnpm-store

# Habilitar verificações de integridade
verify-store-integrity=true
```

## Estrutura resultante

- `node_modules/` (dependências "hoisted" — compatibilidade)
- `.pnpm-store/` (cache local do pnpm)
- `.npmrc` (configurações)
- `src/` (código fonte)
- `package.json`

## Benefícios alcançados

- Compatibilidade com Express e outras bibliotecas.
- Instalações mais rápidas (cache/reutilização).
- Menor consumo global de disco entre projetos.
- Resolução de dependências mais segura.

## Resultado

- Execução local:

```bash
pnpm run dev
# 🚀 Servidor rodando em http://localhost:4000
```

- Problemas relacionados a "module not found" foram resolvidos após a mudança para `node-linker=hoisted`.
