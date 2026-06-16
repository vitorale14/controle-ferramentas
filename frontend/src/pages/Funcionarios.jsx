import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../services/api";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  async function carregarFuncionarios() {
    setFuncionarios(await apiGet("/funcionarios"));
  }

  async function cadastrarFuncionario(e) {
    e.preventDefault();
    if (!nome.trim()) return alert("Digite o nome do funcionário");

    await apiPost("/funcionarios", { nome, setor, telefone });
    setNome("");
    setSetor("");
    setTelefone("");
    carregarFuncionarios();
  }

  async function removerFuncionario(id) {
    if (!confirm("Remover funcionário?")) return;
    await apiDelete(`/funcionarios/${id}`);
    carregarFuncionarios();
  }

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const filtrados = funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <section>
      <h2>Funcionários</h2>

      <form className="form" onSubmit={cadastrarFuncionario}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Setor" value={setor} onChange={(e) => setSetor(e.target.value)} />
        <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <button>Cadastrar</button>
      </form>

      <input className="search" placeholder="Pesquisar funcionário" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />

      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Setor</th>
              <th>Telefone</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((f) => (
              <tr key={f._id}>
                <td>{f.nome}</td>
                <td>{f.setor || "-"}</td>
                <td>{f.telefone || "-"}</td>
                <td><button className="danger" onClick={() => removerFuncionario(f._id)}>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
