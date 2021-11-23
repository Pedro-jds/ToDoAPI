const Tarefa = require("../models/Tarefa")
const bd = require('../infra/sqlite-db')

const tarefa = (app) => {
    app.get('/tarefa', (req, res) => {
        const sql = `SELECT * FROM TAREFAS`

        bd.all(sql, (err, linhas) => {
            if (err) {
                console.log(`Erro ao rodar sql ${err}`)
            }
            else {
                res.json({
                    "Tarefas": linhas,
                    "Count": linhas.length,
                    "erro": false
                })
            }
        })
    })

    app.get('/tarefa/:id', (req, res) => {
        const sql = `SELECT * FROM TAREFAS WHERE id = ?`
        const params = req.params.id

        bd.get(sql, params, (err, linha) => {
            if (err) {
                console.log(`Erro ao rodar sql ${err}`)
            }
            else {
                res.json({

                    "Tarefas": linha,
                    "erro": false
                })
            }
        })
    })

    app.post('/tarefa', (req, res) => {
        const body = req.body
        const tarefa = new Tarefa(body.titulo,body.descricao,body.status,body.datacriacao)
        const params = [tarefa.titulo,tarefa.descricao,tarefa.status,tarefa.dataCriacao]
        const sql = `INSERT INTO TAREFAS (TITULO,DESCRICAO,STATUS,DATACRIACAO) VALUES (?,?,?,?)`
        bd.run(sql,params,(err,resultado)=>{
            if(err){
                res.status(400).json({ "erro": err.message })
                return
            }
            else{
                res.json({
                    "mensagem":"Tarefa criada com sucesso",
                    "tarefa":tarefa,
                    "error":false,
                })
            }
        })
    })

    app.delete('/tarefa/:id',(req,res)=>{
        const params = req.params.id
        const sql = `DELETE FROM TAREFAS WHERE ID = ?`
        bd.run(sql,params,(err,resultado)=>{
            if(err){
                res.status(400).json({ "erro": err.message })
                return
            }
            else{
                res.json({
                    "mensagem":"Tarefa excluída com sucesso",
                    "id tarefa":params,
                    "error":false
                })
            }
        })

    })
}

module.exports = tarefa

