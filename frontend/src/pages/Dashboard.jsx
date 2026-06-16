import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";

export default function Dashboard() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);
  const [emUso, setEmUso] = useState([]);

  async function carregarDados() {
    setFuncionarios(await apiGet("/funcionarios"));
    setFerramentas(await apiGet("/ferramentas"));
    setEmUso(await apiGet("/consultas/em-uso"));
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <section>
      <h2>Resumo geral</h2>
      <div className="cards">
        <div className="card"><span>{funcionarios.length}</span><p>Funcionários</p></div>
        <div className="card"><span>{ferramentas.length}</span><p>Ferramentas</p></div>
        <div className="card"><span>{emUso.length}</span><p>Em uso</p></div>
      </div>

      <h3>Ferramentas com funcionários</h3>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>Ferramenta</th>
              <th>Funcionário</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {emUso.map((item) => (
              <tr key={item._id}>
                <td>{item.nome}</td>
                <td>{item.funcionarioAtual?.nome || "-"}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
