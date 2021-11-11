const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000...')
});

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Rota padrão</h1>
            </body>
        </html>
    `);
});