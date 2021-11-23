const express = require('express');

const TarefaCon = require('./controllers/tarefa.controller');
const UsuarioCon = require('./controllers/usuario.controller');


const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const port = 3000
const  options  =  { 
  customCss : '.swagger-ui .topbar {display: none}' 
} ;

//Middlewares
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));

UsuarioCon(app)
TarefaCon(app)

//index
app.get('/', function (req, res) {
res.send(`<h1>Bem vindo a to do API</h1>
         <a href="http://localhost:3000/api-docs/"><button>Documentação interativa</button><a>
        <h3><a href="https://github.com/Pedro-jds/ToDoAPI">Acesse meu github para mais detalhes</a></h3>`)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})