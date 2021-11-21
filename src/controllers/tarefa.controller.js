const Tarefa = require("../models/Tarefa")
const bd = require('../infra/sqlite-db')

const tarefa = (app) => {
    app.get('/tarefa', (req, res) => {
        const sql = `SELECT * FROM TAREFAS`

        bd.all(sql,(err,linhas)=>{
            if(err){
                console.log(`Erro ao rodar sql ${err}`)
            }
            else{
                res.json({
                    "Tarefas":linhas,
                    "Count":linhas.length,
                    "erro":false
                })
            }
        })    
    })
    app.post('/tarefa', (req, res) => {
        console.log(req.body)
        res.send('Rota ativada com post e recurso tarefa: adiciona tarefas')
    })
}

module.exports = tarefa

