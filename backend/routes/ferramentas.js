const express = require("express");
const Ferramenta = require("../models/Ferramenta");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ferramentas = await Ferramenta.find().populate("funcionarioAtual").sort({ nome: 1 });
    res.json(ferramentas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar ferramentas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const ferramenta = await Ferramenta.create(req.body);
    res.status(201).json(ferramenta);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao cadastrar ferramenta" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const ferramenta = await Ferramenta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ferramenta);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar ferramenta" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Ferramenta.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Ferramenta removida" });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao remover ferramenta" });
  }
});

module.exports = router;
