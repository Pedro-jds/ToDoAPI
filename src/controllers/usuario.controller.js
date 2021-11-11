
const user = (app) => {
    app.get('/', function (req, res) {
        res.send('Server online!')
    })

    app.get('/usuario', (req, res) => {
        res.send('Rota ativada com get e recurso usuario: valores de usuario devem ser retornados')
    })

    app.get('/usuario/info', (req, res) => {
        res.send('Rota ativada com get e recurso usuario: INFO dos usuarios')
    })

}

module.exports = user