import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

export default function Movimentacoes() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [funcionario, setFuncionario] = useState("");
  const [ferramenta, setFerramenta] = useState("");
  const [tipo, setTipo] = useState("Entrega");
  const [observacao, setObservacao] = useState("");

  async function carregarDados() {
    setFuncionarios(await apiGet("/funcionarios"));
    setFerramentas(await apiGet("/ferramentas"));
    setMovimentacoes(await apiGet("/movimentacoes"));
  }

  async function registrarMovimentacao(e) {
    e.preventDefault();

    if (!funcionario || !ferramenta) {
      return alert("Selecione funcionário e ferramenta");
    }

    try {
      await apiPost("/movimentacoes", { funcionario, ferramenta, tipo, observacao });
      setFuncionario("");
      setFerramenta("");
      setObservacao("");
      carregarDados();
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const ferramentasDisponiveis = tipo === "Entrega"
    ? ferramentas.filter((f) => f.status === "Disponível")
    : ferramentas.filter((f) => f.status === "Em uso");

  return (
    <section>
      <h2>Movimentações</h2>

      <form className="form" onSubmit={registrarMovimentacao}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Entrega">Entrega</option>
          <option value="Devolução">Devolução</option>
        </select>

        <select value={funcionario} onChange={(e) => setFuncionario(e.target.value)}>
          <option value="">Funcionário</option>
          {funcionarios.map((f) => <option key={f._id} value={f._id}>{f.nome}</option>)}
        </select>

        <select value={ferramenta} onChange={(e) => setFerramenta(e.target.value)}>
          <option value="">Ferramenta</option>
          {ferramentasDisponiveis.map((f) => (
            <option key={f._id} value={f._id}>{f.nome} {f.codigo ? `- ${f.codigo}` : ""}</option>
          ))}
        </select>

        <input placeholder="Observação" value={observacao} onChange={(e) => setObservacao(e.target.value)} />
        <button>Registrar</button>
      </form>

      <h3>Histórico</h3>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Ferramenta</th>
              <th>Funcionário</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((m) => (
              <tr key={m._id}>
                <td>{new Date(m.createdAt).toLocaleString("pt-BR")}</td>
                <td>{m.tipo}</td>
                <td>{m.ferramenta?.nome || "-"}</td>
                <td>{m.funcionario?.nome || "-"}</td>
                <td>{m.observacao || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
