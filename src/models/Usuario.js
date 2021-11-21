

class Usuario {
    constructor(nome,email,senha){
        this.nome = nome.toLowerCase()
        this.email = email.toLowerCase()
        this.senha = this.verificaSenha(senha)
    }

    verificaSenha(senha){
        if(senha.length > 6){
            return senha
        }
        else{
            console.log("Erro de caracteres")
            return
        }
    }

}

module.exports = Usuario