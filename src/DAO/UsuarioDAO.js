class UsuarioDAO {

    constructor(bd) {
        this.bd = bd
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.bd.all('SELECT * FROM USUARIOS', (err, linhas) => {
                if (err) {
                    reject({
                        "mensagem": err.message
                    })
                }
                else {
                    resolve({
                        "Usuario": linhas,
                        "count": linhas.length,
                        "error": false
                    })
                }
            })
        })
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            this.bd.get('SELECT * FROM USUARIOS WHERE ID = ?', id, (err, linha) => {
                if (err) {
                    reject({
                        "mensagem": err.message
                    })
                }
                else {
                    resolve({
                        "Usuario": linha,
                        "error": false
                    })
                }
            })
        })
    }
    deleteByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM USUARIOS WHERE EMAIL = ?"
            this.bd.run(sql, email, function (err, resultado) {
                if (err) {
                    reject({
                        "messagem": err.message
                    })
                }
                else {
                    resolve({
                        "mensagem": "Usuario excluído com sucesso!",
                        "email": email,
                        "changes": this.changes
                    })
                }
            })
        })
    }
    deleteById(id) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM USUARIOS WHERE ID = ?"
            this.bd.run(sql, id, function (err) {
                if (err) {
                    reject({
                        "messagem": err.message
                    })
                }
                else {
                    resolve({
                        "mensagem": "Excluído com sucesso!",
                        "ID": id,
                        "changes": this.changes
                    })
                }
            })
        })
    }
    createUser(params) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?,?,?)"
            this.bd.run(sql, params, function (err) {
                if (err) {
                    reject({
                        "erro": err.message
                    })
                }
                else {
                    resolve({
                        "mensagem": "Usuario inserido com sucesso",
                        "erro": false,
                        "id": this.lastID
                    })
                }
            })
        })
    }
    updateById(params) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE USUARIOS SET
                        NOME = COALESCE(?,nome),
                        EMAIL = COALESCE(?,email),
                        SENHA = COALESCE(?,senha)
                        WHERE ID = ?`
            this.bd.run(sql, params, function (err) {
                if (err) {
                    reject({
                        "error": err.message
                    })
                }
                else {
                    resolve({
                        "messagem": "Usuario atualizado com sucesso",
                        "erro": false,
                        "changes": this.changes
                    })
                }
            })
        })
    }
    getAllTaskUserByID(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT USUARIOS.NOME,
                            TAREFAS.TITULO,
                            TAREFAS.DESCRICAO,
                            TAREFAS.STATUS,
                            TAREFAS.DATACRIACAO 
                            FROM TAREFAS 
                            INNER JOIN USUARIOS
                            ON (USUARIOS.ID = TAREFAS.ID_USUARIO)
                            WHERE USUARIOS.ID = ?`
            this.bd.all(sql, id, (err, rows) => {
                if (err) {
                    reject({
                        "mensagem": err.message
                    })
                }
                else {
                    resolve({
                        "Usuario": rows,
                        "error": false
                    })
                }
            })
        })
    }
}

module.exports = UsuarioDAO