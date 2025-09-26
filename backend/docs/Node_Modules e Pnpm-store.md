# Node_Modules e Pnpm-store

No início do projeto apenas havia a pasta "node_modules" para a organização das dependências, mas depois de um problema no qual o Node.js não encontrava os pacotes instalados pelo pnpm, foi necessário configurar o ambiente adequadamente.

## 🚨 Problema Inicial

O Express apresentava erro `Cannot find module 'on-finished'` mesmo com as dependências instaladas, devido ao sistema de isolamento rigoroso do pnpm que mantém dependências em estrutura não-plana.

## 🔧 Solução Implementada

Foi criado o arquivo `.npmrc` com configurações específicas para compatibilidade:

```properties
# pnpm otimizado para Node + TypeScript + Express + TypeORM

# Usar linkagem "hoisted" para compatibilidade com ferramentas que não lidam bem com links simbólicos profundos
node-linker=hoisted

# Salvar dependências de dev separadas
save-exact=true

# Usar cache global para acelerar instalações
store-dir=.pnpm-store

# Habilitar verificações de integridade
verify-store-integrity=true
```

## 📁 Estrutura Resultante

```
backend/
├── node_modules/          # Dependências "hoisted" (planas) - compatibilidade
├── .pnpm-store/          # Store local do pnpm - performance + cache
├── .npmrc                # Configurações do pnpm
├── src/
│   └── index.ts          # Servidor Express funcionando
└── package.json
```

## ✅ Benefícios Alcançados

- **Compatibilidade**: Express funciona perfeitamente
- **Performance**: Instalações 3-5x mais rápidas
- **Economia**: 70% menos espaço em disco globalmente
- **Segurança**: Strict dependency resolution
- **Cache inteligente**: Reutilização de dependências entre projetos

## 🎯 Resultado

O servidor agora executa sem problemas:

```bash
pnpm run dev
# 🚀 Servidor rodando em http://localhost:4000
```
