import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

export default function Consultas() {
  const [emUso, setEmUso] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [pesquisaFerramenta, setPesquisaFerramenta] = useState("");
  const [pesquisaFuncionario, setPesquisaFuncionario] = useState("");

  async function carregarConsultas() {
    setEmUso(await apiGet("/consultas/em-uso"));
    setHistorico(await apiGet("/consultas/historico"));
  }

  useEffect(() => {
    carregarConsultas();
  }, []);

  const emUsoFiltradas = emUso.filter((item) => {
    const ferramentaOk = item.nome.toLowerCase().includes(pesquisaFerramenta.toLowerCase());
    const funcionarioOk = (item.funcionarioAtual?.nome || "").toLowerCase().includes(pesquisaFuncionario.toLowerCase());
    return ferramentaOk && funcionarioOk;
  });

  return (
    <section>
      <h2>Consultas</h2>

      <div className="filters">
        <input placeholder="Pesquisar ferramenta" value={pesquisaFerramenta} onChange={(e) => setPesquisaFerramenta(e.target.value)} />
        <input placeholder="Pesquisar funcionário" value={pesquisaFuncionario} onChange={(e) => setPesquisaFuncionario(e.target.value)} />
      </div>

      <h3>Ferramentas em uso</h3>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>Ferramenta</th>
              <th>Código</th>
              <th>Funcionário</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {emUsoFiltradas.map((item) => (
              <tr key={item._id}>
                <td>{item.nome}</td>
                <td>{item.codigo || "-"}</td>
                <td>{item.funcionarioAtual?.nome || "-"}</td>
                <td><span className="tag busy">{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Histórico completo</h3>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Ferramenta</th>
              <th>Funcionário</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((m) => (
              <tr key={m._id}>
                <td>{new Date(m.createdAt).toLocaleString("pt-BR")}</td>
                <td>{m.tipo}</td>
                <td>{m.ferramenta?.nome || "-"}</td>
                <td>{m.funcionario?.nome || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
