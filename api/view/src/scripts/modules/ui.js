import api from "./api.js";

const ui = {
  // 🔹 Renderizar lista de tarefas
  async renderizarTarefas() {
    try {
      const tarefas = await api.exibirTarefas();

      const listTarefas = document.getElementById("list-tarefas");
      listTarefas.innerHTML = ""; // limpa a lista antes de renderizar

      tarefas.forEach(ui.adicionarTarefas);
    } catch (error) {
      alert("Falha na renderização da API!");
      console.error(error);
    }
  },

  // 🔹 Criar estrutura visual de cada tarefa
  adicionarTarefas(tarefa) {
    const listTarefas = document.getElementById("list-tarefas");

    const li = document.createElement("li");
    li.setAttribute("data-id", tarefa._id);

    // Checkbox
    const input = document.createElement("input");
    input.type = "checkbox";
   /*  input.setAttribute("type","checkbox") */

    // Título
    const h3 = document.createElement("h3");
    h3.classList.add("task-task");
    h3.innerText = tarefa.titulo;

    // Descrição
    const p = document.createElement("p");
    p.innerText = tarefa.descricao;

    const spanHora = document.createElement("span");
    spanHora.classList.add("hora-tarefa");

    if (tarefa.hora) {
      const data = new Date(tarefa.hora);
      const horaFormatada = data.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
      });
      const linhaSuperior = document.createElement("div");
      linhaSuperior.classList.add("hora-label");
      linhaSuperior.innerHTML = `🕒 <strong>Criada em:</strong>`;

      const linhaInferior = document.createElement("div");
      linhaInferior.classList.add("hora-valor");
      linhaInferior.textContent = horaFormatada;

  // 🔸 Monta as duas linhas dentro do container principal
       spanHora.append(linhaSuperior, linhaInferior);

    } else {
      spanHora.innerText = "🕒 Data não disponível";
    }
  
    // Div de botões
    const div = document.createElement("div");
    div.classList.add("actions");
//========================================================
    // 🔸 Botão Editar
    const button1 = document.createElement("button");
    button1.classList.add("btn-action", "btn-edit");
    button1.onclick = () => {
      const btnadicionar = document.getElementById('btnAdd')
      btnadicionar.innerText="Add Alteração"
      ui.formEdit(tarefa._id)
    }

       
 

    const iconEdit = document.createElement("img");
    iconEdit.src = "./src/assets/icons/editar.png";
    iconEdit.alt = "Botão Editar";
    button1.appendChild(iconEdit);
//
    // 🔸 Botão Deletar
    const button2 = document.createElement("button");
    button2.classList.add("btn-action", "btn-delete");
    button2.onclick = () => ui.deletarTarefa(tarefa._id);
    

    const iconDelete = document.createElement("img");
    iconDelete.src = "./src/assets/icons/delete.png";
    iconDelete.alt = "Botão Delete";
    button2.appendChild(iconDelete);

      // Montagem final
    div.append(button1, button2);
    li.append(input, h3, p, spanHora, div);
    listTarefas.appendChild(li);
  },

  // 🔹 Preencher formulário com dados para edição
  async formEdit(tarefaId) {
    if(confirm("Deseja alterar este ítem?")){
    try {
      console.log("ID recebido:", tarefaId);
      const tarefa = await api.BuscarId(tarefaId);

      document.getElementById("form-id").value = tarefa._id;
      document.getElementById("titulo").value = tarefa.titulo;
      document.getElementById("descricao").value = tarefa.descricao;
    } catch (error) {
      alert("Erro ao buscar tarefa para edição!");
      console.error(error);
    }
  }
},

  // 🔹 Deletar tarefa
  async deletarTarefa(id) {
    if (confirm("Deseja realmente excluir esta tarefa?")) {
      try {
        await api.deletarTarefa(id);
        this.renderizarTarefas();
      } catch (error) {
        alert("Falha ao deletar tarefa!");
        console.error(error);
      }
    }
  }
};

export default ui;






    




    













                            




           





