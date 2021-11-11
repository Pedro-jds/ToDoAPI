
const tarefa = (app) => {
    app.get('/tarefa', (req, res) => {
        res.send('Rota ativada com get e recurso tarefa: valores de tarefa devem ser retornados')
    })
}

module.exports = tarefa

