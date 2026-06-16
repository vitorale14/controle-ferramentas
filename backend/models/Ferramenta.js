const mongoose = require("mongoose");

const ferramentaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    codigo: { type: String, trim: true },
    categoria: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Disponível", "Em uso"],
      default: "Disponível"
    },
    funcionarioAtual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Funcionario",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ferramenta", ferramentaSchema);
