const mongoose = require("mongoose");

const funcionarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    setor: { type: String, trim: true },
    telefone: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Funcionario", funcionarioSchema);
