const express = require("express");
const Funcionario = require("../models/Funcionario");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const funcionarios = await Funcionario.find().sort({ nome: 1 });
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar funcionários" });
  }
});

router.post("/", async (req, res) => {
  try {
    const funcionario = await Funcionario.create(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao cadastrar funcionário" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(funcionario);
  } catch (error) {
    res.status(400).json({ erro: "Erro ao atualizar funcionário" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Funcionario.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Funcionário removido" });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao remover funcionário" });
  }
});

module.exports = router;
