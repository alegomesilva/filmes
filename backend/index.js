const express = require('express');
const app = express();
const cors = require('cors');

const filmesRouter = require('./routes/filmes.routes');

app.use(express.json());

app.use(cors());


app.use('/filmes', filmesRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor na porta ${port}`);
});