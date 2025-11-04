import tarefa from "../models/dbtarefas.js";

class TarefaControll {
  // 📜 Exibir todas as tarefas
  static async exibirTarefa(req, res) {
    try {
      const listTask = await tarefa.find({});
      res.status(200).json(listTask);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar tarefas", error: `${error}` });
    }
  }

  // ➕ Criar nova tarefa
  static async criarTarefa(req, res) {
    try {
      const novaTarefa = req.body;
      const tarefas = await tarefa.create(novaTarefa);
      res.status(201).json({ mensagem: "Tarefa criada com sucesso", dados: tarefas });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao criar a tarefa", error: `${error}` });
    }
  }

  // 🔍 Buscar tarefa por ID
  static async BuscarId(req, res) {
    try {
      const { id } = req.params;
      const tarefas = await tarefa.findById(id);

      if (!tarefas) {
        return res.status(404).json({ erro: "ID da tarefa não encontrado!" });
      }

      res.status(200).json(tarefas);
    } catch (error) {
      res.status(500).json({ mensagem: `Falha na busca pelo ID da tarefa - ${error}` });
    }
  }

  // ✏️ Atualizar tarefa
  static async AtualizaTarefa(req, res) {
    try {
      const { id } = req.params;
      const tarefas = await tarefa.findByIdAndUpdate(id, req.body, { new: true });

      if (!tarefas) {
        return res.status(404).json({ mensagem: "Tarefa não encontrada para atualização" });
      }

      res.status(200).json({ mensagem: "Tarefa atualizada com sucesso", dados: tarefas });
    } catch (error) {
      res.status(500).json({ mensagem: `Erro na atualização da tarefa - ${error}` });
    }
  }

  // 🗑️ Deletar tarefa
  static async DeletarLista(req, res) {
    try {
      const { id } = req.params;
      const deletado = await tarefa.findByIdAndDelete(id);

      if (!deletado) {
        return res.status(404).json({ mensagem: "Tarefa não encontrada para exclusão" });
      }

      res.status(200).json({ mensagem: "Tarefa deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao fazer a exclusão", error: `${error}` });
    }
  }
}

export default TarefaControll;
