import express from 'express'
import TarefaControll from '../controller/tarefaControll.js';

const routesTesk = express.Router()
routesTesk.get('/tarefas', TarefaControll.exibirTarefa);
routesTesk.get('/tarefas/:id', TarefaControll.BuscarId)
routesTesk.post('/tarefas', TarefaControll.criarTarefa);
routesTesk.put('/tarefas/:id', TarefaControll.AtualizaTarefa);
routesTesk.delete('/tarefas/:id', TarefaControll.DeletarLista)


export default routesTesk;