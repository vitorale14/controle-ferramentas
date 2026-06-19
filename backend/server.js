const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

const funcionarioRoutes = require("./routes/funcionarios");
const ferramentaRoutes = require("./routes/ferramentas");
const movimentacaoRoutes = require("./routes/movimentacoes");
const consultaRoutes = require("./routes/consultas");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://controle-ferramentas-theta.vercel.app",
    "https://controle-ferramentas-git-main-solcycle.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API Controle de Ferramentas funcionando" });
});

app.use("/funcionarios", funcionarioRoutes);
app.use("/ferramentas", ferramentaRoutes);
app.use("/movimentacoes", movimentacaoRoutes);
app.use("/consultas", consultaRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado com sucesso");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((error) => {
    console.error("Erro ao conectar no MongoDB:", error.message);
  });