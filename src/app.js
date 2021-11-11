const express = require('express');

const TarefaCon = require('./controllers/tarefa.controller');
const UsuarioCon = require('./controllers/usuario.controller');

const app = express()
const port = 3000


UsuarioCon(app)
TarefaCon(app)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})