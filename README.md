# Controle de Ferramentas

Sistema simples para controlar quais ferramentas estão com cada funcionário.

## Funcionalidades

- Cadastro de funcionários
- Cadastro de ferramentas
- Entrega de ferramenta para funcionário
- Devolução de ferramenta
- Consulta de ferramentas em uso
- Histórico de movimentações
- Dados salvos no MongoDB Atlas

## Como rodar

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

No arquivo `.env`, cole sua URI do MongoDB Atlas em `MONGO_URI`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse o endereço mostrado pelo Vite, normalmente:

```txt
http://localhost:5173
```
