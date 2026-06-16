const express = require("express");
const Movimentacao = require("../models/Movimentacao");
const Ferramenta = require("../models/Ferramenta");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movimentacoes = await Movimentacao.find()
      .populate("funcionario")
      .populate("ferramenta")
      .sort({ createdAt: -1 });
    res.json(movimentacoes);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar movimentações" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { ferramenta, funcionario, tipo, observacao } = req.body;
    const ferramentaEncontrada = await Ferramenta.findById(ferramenta);

    if (!ferramentaEncontrada) {
      return res.status(404).json({ erro: "Ferramenta não encontrada" });
    }

    if (tipo === "Entrega" && ferramentaEncontrada.status === "Em uso") {
      return res.status(400).json({ erro: "Essa ferramenta já está em uso" });
    }

    if (tipo === "Entrega") {
      ferramentaEncontrada.status = "Em uso";
      ferramentaEncontrada.funcionarioAtual = funcionario;
    }

    if (tipo === "Devolução") {
      ferramentaEncontrada.status = "Disponível";
      ferramentaEncontrada.funcionarioAtual = null;
    }

    await ferramentaEncontrada.save();

    const movimentacao = await Movimentacao.create({ ferramenta, funcionario, tipo, observacao });
    const movimentacaoCompleta = await movimentacao.populate(["funcionario", "ferramenta"]);

    res.status(201).json(movimentacaoCompleta);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao registrar movimentação" });
  }
});

module.exports = router;
