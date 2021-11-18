var id = 0

class Usuario {
    constructor(nome,email,senha){
        this.id = id++
        this.nome = nome.toLowerCase()
        this.email = email.toLowerCase()
        this.senha = this.verificaSenha(senha)
    }

    verificaSenha(senha){
        if(senha.length < 6){
            return senha
        }
        else{
            console.log("Erro de caracteres")
        }
    }

}

module.exports = Usuario