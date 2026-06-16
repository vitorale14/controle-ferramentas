const express = require("express");
const Ferramenta = require("../models/Ferramenta");
const Movimentacao = require("../models/Movimentacao");
const router = express.Router();

router.get("/em-uso", async (req, res) => {
  try {
    const ferramentas = await Ferramenta.find({ status: "Em uso" })
      .populate("funcionarioAtual")
      .sort({ nome: 1 });
    res.json(ferramentas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao consultar ferramentas em uso" });
  }
});

router.get("/historico", async (req, res) => {
  try {
    const historico = await Movimentacao.find()
      .populate("funcionario")
      .populate("ferramenta")
      .sort({ createdAt: -1 });
    res.json(historico);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao consultar histórico" });
  }
});

module.exports = router;
