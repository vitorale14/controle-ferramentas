import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar(e) {
    e.preventDefault();

    if (usuario === "admin" && senha === "senha123") {
      localStorage.setItem("auth", "true");
      onLogin();
    } else {
      setErro("Usuário ou senha incorretos");
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={entrar}>
        <h1>Controle de Ferramentas</h1>
        <p>Acesse o sistema</p>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <span className="login-error">{erro}</span>}

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;   