const Usuario = require("../models/Usuario")
const bd = require("../infra/sqlite-db")
const UsuarioDAO = require("../DAO/UsuarioDAO")


const user = (app) => {

    const novoUsuario = new UsuarioDAO(bd)

    //Busca todos usuarios cadastrados  
    app.get('/usuario', (req, res) => {
        novoUsuario.getAll()
            .then((resposta) => {
                res.json(resposta)
            })
            .catch((error) => {
                res.json(error)
            })
    })

    //Busca um usuario pelo id
    app.get('/usuario/:id', (req, res) => {
        const id = req.params.id
        novoUsuario.getById(id)
            .then((resposta) => {
                res.json(resposta)
            })
            .catch((error) => {
                res.json(error)
            })
    })

    //Exclui um usuario pelo email
    app.delete('/usuario/email/:email', (req, res) => {
        const email = req.params.email
        novoUsuario.deleteByEmail(email)
            .then((resposta) => {
                res.json(resposta)
            })
            .catch((error) => {
                res.json(error)
            })
    })

    //Exclui um usuario pelo id
    app.delete('/usuario/:id', (req, res) => {
        const id = req.params.id
        novoUsuario.deleteById(id)
            .then((resposta) => {
                res.json(resposta)
            })
            .catch((error) => {
                res.json(error)
            })
    })

    //Adiciona um usuario no banco de dados
    app.post('/usuario', (req, res) => {
        const body = req.body
        const user = new Usuario(body.nome, body.email, body.senha)
        const params = [user.nome, user.email, user.senha]
        novoUsuario.createUser(params)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.json(error)
            })
    })

    //Altera um ou mais atributos
    app.patch('/usuario/:id', (req, res) => {
        const data = req.body
        const params = [data.nome, data.email, data.senha, req.params.id]
        novoUsuario.updateById(params)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.json(error)
            })
    })

    //retorna todas tarefas de um usuario pelo id do usuario
    app.get('/usuario/tarefa/:id', (req, res) => {
        const id = [req.params.id]
        novoUsuario.getAllTaskUserByID(id)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.json(error)
            })
    })
}


module.exports = user