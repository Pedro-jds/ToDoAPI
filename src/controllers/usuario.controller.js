const Usuario = require("../models/Usuario")
const bd = require("../infra/bd")
const { usuario } = require("../infra/bd")



const user = (app) => {

    app.get('/usuario', (req, res) => {
        res.json({
            "Usuario": bd.usuario
        })
    })

    // app.get('/usuario/:id', (req, res) => {
    //     res.json({
    //         "Usuario": bd.usuario[req.params.user]
    //     })
    // })

    app.get('/usuario/:user', (req, res) => {
        const user1 = req.params.user
        let userBD = ""
        for (let i = 0; i < bd.usuario.length; i++) {
            if (bd.usuario[i].nome == user1) {
                userBD = bd.usuario[i]
            }
        }
        res.json({
            "Usuario":userBD
        })
    })

    app.delete('/usuario/email/:email', (req, res) => {
        const email = req.params.email

        const idUsuarioExcluido = bd.usuario.findIndex((usuario=>usuario.email===email))
        bd.usuario.splice(idUsuarioExcluido, 1)
        res.json({
            "msg":"Rota delete ativada com sucesso",
            "email":email,
            "usuarioBD":bd.usuario
        })
    })



    app.post('/usuario', (req, res) => {
        try {
            const body = req.body
            const pessoa = new Usuario(body.nome, body.email, body.senha)
            bd.usuario.push(pessoa)
            res.json({
                "requiscao": pessoa,
                "erro": false
            })

        } catch (error) {
            res.json({
                "msg": error.msg,
                "erro": false
            })
        }
    })
}

const pessoa = new Usuario("Pedro", "aaaaa@aaaaa.com", "12345")
const pessoa1 = new Usuario("Pedro", "aaaaa@aaaaa.com", "12345")
const pessoa2 = new Usuario("Pedro", "aaaaa@aaaaa.com", "12345")
console.log(pessoa, pessoa1, pessoa2)

module.exports = user