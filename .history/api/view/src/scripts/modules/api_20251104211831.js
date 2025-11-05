
const BASE_URL = "https://tesk-lists.vercel.app";

async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, options);
  if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
  return res.json();
}
export default { //exportar api.js ou export default api;
  async exibirTarefas() {
    return request("/tarefas");
  },
   async BuscarId(_id) {
    return request(`/tarefas/${_id}`);
  },
  async criarTarefa(tarefa) {
    return request("/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarefa),
    });
  },

  async atualizarTarefa(id, tarefa) {
    return request(`/tarefas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarefa),
    });
  },
  async deletarTarefa(id) {
    return request(`/tarefas/${id}`, { method: "DELETE" });
  },
};
