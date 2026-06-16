import { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Funcionarios from "./pages/Funcionarios.jsx";
import Ferramentas from "./pages/Ferramentas.jsx";
import Movimentacoes from "./pages/Movimentacoes.jsx";
import Consultas from "./pages/Consultas.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  const [pagina, setPagina] = useState("dashboard");
  const [logado, setLogado] = useState(
    localStorage.getItem("auth") === "true"
  );

  function sair() {
    localStorage.removeItem("auth");
    setLogado(false);
  }

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Controle</h1>
        <p>Ferramentas</p>

        <button onClick={() => setPagina("dashboard")}>Início</button>
        <button onClick={() => setPagina("funcionarios")}>Funcionários</button>
        <button onClick={() => setPagina("ferramentas")}>Ferramentas</button>
        <button onClick={() => setPagina("movimentacoes")}>Movimentações</button>
        <button onClick={() => setPagina("consultas")}>Consultas</button>

        <button
          onClick={sair}
          style={{
            marginTop: "auto",
            background: "#dc2626",
          }}
        >
          Sair
        </button>
      </aside>

      <main className="content">
        {pagina === "dashboard" && <Dashboard />}
        {pagina === "funcionarios" && <Funcionarios />}
        {pagina === "ferramentas" && <Ferramentas />}
        {pagina === "movimentacoes" && <Movimentacoes />}
        {pagina === "consultas" && <Consultas />}
      </main>
    </div>
  );
}