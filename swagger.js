const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./src/controllers/usuario.controller.js','./src/controllers/tarefa.controller.js']

swaggerAutogen(outputFile, endpointsFiles)