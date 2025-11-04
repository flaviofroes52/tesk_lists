import mongoose from "mongoose";

// Schema da tarefa
const tarefaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      trim: true,
    },
    hora: {
      type:Date, 
      default:Date.now,
      trim: true
    }
  },
  
  {
    versionKey: false,   // remove o __v do Mongo
    timestamps: true,    // cria automaticamente createdAt e updatedAt
  }
);

// Modelo
const TarefaModel = mongoose.model("Tarefa", tarefaSchema);

export default TarefaModel;
