const Tarefa = require("../models/Tarefa")

const tarefa = (app) => {
    app.get('/tarefa', (req, res) => {
        res.send('Rota ativada com get e recurso tarefa: valores de tarefa devem ser retornados')
    })
    app.post('/tarefa', (req, res) => {
        console.log(req.body)
        res.send('Rota ativada com post e recurso tarefa: adiciona tarefas')
    })
}

const tarefa1 = new Tarefa("estudar","praticar programação","a fazer","16/11/2021")
console.log(tarefa1)

module.exports = tarefa

