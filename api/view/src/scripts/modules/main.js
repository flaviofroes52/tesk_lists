import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarTarefas();

  const formTarefas = document.getElementById("form_Tarefa");
  formTarefas.addEventListener("submit", manipulaFormTarefas);

  inicializaArrasteResize();
});

async function manipulaFormTarefas(event) {
  event.preventDefault();

  const id = document.getElementById("form-id").value.trim();
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  try {
    if (id) {
      await api.atualizarTarefa(id, { titulo, descricao });
      alert("Item alterado com sucesso!");
    } else {
      await api.criarTarefa({ titulo, descricao });

    }

    await ui.renderizarTarefas();
    limpaCampos();
  } catch (error) {
    alert("Erro ao adicionar ou atualizar tarefas!");
    console.error(error);
  }
}

function limpaCampos() {
  document.getElementById("form-id").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  const btnadicionar = document.getElementById('btnAdd')
    btnadicionar.innerText = "Adicionar";
    
  
}

// ===== Arraste e Redimensionamento =====
function inicializaArrasteResize() {
  const container = document.querySelector(".todo-container");

  // Centraliza no início
  const rect = container.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  container.style.position = "absolute";
  container.style.left = (viewportWidth - rect.width) / 2 + "px";
  container.style.top = (viewportHeight - rect.height) / 2 + "px";
  container.style.transform = "none";
  container.style.cursor = "grab";

  let isDragging = false;
  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  container.addEventListener("mousedown", e => {
    const targetTag = e.target.tagName;
    const isInteractive = ["INPUT", "TEXTAREA", "BUTTON"].includes(targetTag) || e.target.type === "checkbox";
    if (isInteractive) return;

    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Canto inferior direito para redimensionar (12px)
    if (offsetX > rect.width - 12 && offsetY > rect.height - 12) {
      isResizing = true;
      startWidth = rect.width;
      startHeight = rect.height;
      startX = e.clientX;
      startY = e.clientY;
      container.style.cursor = "nwse-resize";
    } else {
      isDragging = true;
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      container.style.cursor = "grabbing";
    }
  });
  document.addEventListener("mousemove", e => {
    if (isDragging) {
      container.style.left = e.clientX - startX + "px";
      container.style.top = e.clientY - startY + "px";
    } else if (isResizing) {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      container.style.width = Math.max(newWidth, 250) + "px";
      container.style.height = Math.max(newHeight, 200) + "px";
    }
  });
  document.addEventListener("mouseup", () => {
    if (isDragging || isResizing) {
      isDragging = false;
      isResizing = false;
      container.style.cursor = "grab";
    }
  });
  // Ajusta a posição ao redimensionar a tela
  window.addEventListener("resize", () => {
    const rect = container.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    container.style.left = Math.min(rect.left, vw - rect.width) + "px";
    container.style.top = Math.min(rect.top, vh - rect.height) + "px";
  });
}
