const API_URL = import.meta.env.VITE_API_URL;

export async function apiGet(rota) {
  const resposta = await fetch(`${API_URL}${rota}`);
  return resposta.json();
}

export async function apiPost(rota, dados) {
  const resposta = await fetch(`${API_URL}${rota}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || "Erro na requisição");
  return resultado;
}

export async function apiPut(rota, dados) {
  const resposta = await fetch(`${API_URL}${rota}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });
  return resposta.json();
}

export async function apiDelete(rota) {
  const resposta = await fetch(`${API_URL}${rota}`, { method: "DELETE" });
  return resposta.json();
}
