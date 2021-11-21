const Usuario = require("../models/Usuario")
const bd = require("../infra/sqlite-db")


const user = (app) => {

    //Busca todos usuarios cadastrados
    app.get('/usuario', (req, res) => {
        bd.all('SELECT * FROM USUARIOS', (err, linhas) => {
            if (err) {
                console.log(err)
            }
            else {
                res.json({
                    "Usuario": linhas,
                    "count": linhas.length,
                    "error": false
                })
            }
        })
    })

    //Busca um usuario pelo id
    app.get('/usuario/:id', (req, res) => {
        
        const sql = 'SELECT * FROM USUARIOS WHERE ID = ?'
        const params = [req.params.id]
        bd.get(sql, params, (err, linha) => {
            if (err) {
                console.log(err)
            }
            else {
                res.json({
                    "Usuario": linha,
                    "error": false
                })
            }
        })
    })

    //Exclui um usuario pelo email
    app.delete('/usuario/email/:email', (req, res) => {
        const email = req.params.email
        const sql = "DELETE FROM USUARIOS WHERE EMAIL = ?"
        bd.run(sql,email,function (err, resultado) {
                if (err) {
                    console.log(err)
                    res.status(400).json({ "error": res.message })
                    return;
                }
                else {
                    res.json({
                        "mensagem": "Excluído com sucesso!",
                        "email": email,
                        "changes": this.changes
                    })
                }
            }
        )
    })

    //Exclui um usuario pelo id
    app.delete('/usuario/:id', (req, res) => {
        const id = req.params.id
        const sql = "DELETE FROM USUARIOS WHERE ID = ?"
        bd.run(sql,id,function (err, resultado) {
                if (err) {
                    console.log(err)
                    res.status(400).json({ "error": res.message })
                    return;
                }
                else {
                    res.json({
                        "mensagem": "Excluído com sucesso!",
                        "ID": id,
                        "changes": this.changes
                    })
                }
            }
        )
    })

    //Adiciona um usuario no banco de dados
    app.post('/usuario', (req, res) => {

        const body = {
            'nome': req.body.nome,
            'email': req.body.email,
            'senha': req.body.senha
        }
        const pessoa = new Usuario(body.nome, body.email, body.senha)
        const sql = "INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?,?,?)"
        const params = [pessoa.nome, pessoa.email, pessoa.senha]
        console.log(pessoa)
        bd.run(sql, params, function (err, resultado) {
            console.log(resultado)
            if (err) {
                res.status(400).json({ "erro": err.message })
                return
            }
            else {
                res.json({
                    "mensagem":"Usuario inserido com sucesso",
                    "requiscao": pessoa,
                    "erro": false,
                    "id": this.lastID
                })
            }
        })
    })

    //Altera um ou mais atributos
    app.patch('/usuario/:id', (req, res) => {
        const data = {
            'nome': req.body.nome,
            'email': req.body.email,
            'senha': req.body.senha
        }
        bd.run(
            `UPDATE USUARIOS SET
             NOME = COALESCE(?,nome),
             EMAIL = COALESCE(?,email),
             SENHA = COALESCE(?,senha)
             WHERE ID = ?`,
            [data.nome, data.email, data.senha, req.params.id],
            function (err, resultado) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return
                }
                else {
                    res.json({
                        "requiscao": data,
                        "erro": false,
                        "changes": this.changes
                    })
                }
            }
        )
    })
}

// app.put('/usuario/:email',(req,res)=>{
//     const user = req.params.nome
//     const upd = req.body
//     let a =  bd.usuario.findIndex((usuario=>usuario.nome===user))

// })


// app.get('/usuario/:user', (req, res) => {
//     const user1 = req.params.user
//     let userBD = ""
//     for (let i = 0; i < bd.usuario.length; i++) {
//         if (bd.usuario[i].nome == user1) {
//             userBD = bd.usuario[i]
//         }
//     }
//     res.json({
//         "Usuario": userBD
//     })
// })

module.exports = user