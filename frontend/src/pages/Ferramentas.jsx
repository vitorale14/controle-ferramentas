import React, { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../services/api";

export default function Ferramentas() {
  const [ferramentas, setFerramentas] = useState([]);
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  async function carregarFerramentas() {
    setFerramentas(await apiGet("/ferramentas"));
  }

  async function cadastrarFerramenta(e) {
    e.preventDefault();
    if (!nome.trim()) return alert("Digite o nome da ferramenta");

    await apiPost("/ferramentas", { nome, codigo, categoria });
    setNome("");
    setCodigo("");
    setCategoria("");
    carregarFerramentas();
  }

  async function removerFerramenta(id) {
    if (!confirm("Remover ferramenta?")) return;
    await apiDelete(`/ferramentas/${id}`);
    carregarFerramentas();
  }

  useEffect(() => {
    carregarFerramentas();
  }, []);

  const filtradas = ferramentas.filter((f) =>
    f.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    String(f.codigo || "").toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <section>
      <h2>Ferramentas</h2>

      <form className="form" onSubmit={cadastrarFerramenta}>
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Código / Patrimônio" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        <input placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        <button>Cadastrar</button>
      </form>

      <input className="search" placeholder="Pesquisar ferramenta" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />

      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Código</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Funcionário</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((f) => (
              <tr key={f._id}>
                <td>{f.nome}</td>
                <td>{f.codigo || "-"}</td>
                <td>{f.categoria || "-"}</td>
                <td><span className={f.status === "Em uso" ? "tag busy" : "tag ok"}>{f.status}</span></td>
                <td>{f.funcionarioAtual?.nome || "-"}</td>
                <td><button className="danger" onClick={() => removerFerramenta(f._id)}>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
