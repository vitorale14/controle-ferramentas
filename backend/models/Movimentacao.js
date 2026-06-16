const mongoose = require("mongoose");

const movimentacaoSchema = new mongoose.Schema(
  {
    ferramenta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ferramenta",
      required: true
    },
    funcionario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Funcionario",
      required: true
    },
    tipo: {
      type: String,
      enum: ["Entrega", "Devolução"],
      required: true
    },
    observacao: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movimentacao", movimentacaoSchema);
