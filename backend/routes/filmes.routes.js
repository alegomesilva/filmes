const express = require('express');
const router = express.Router();

const filmes = [
    
    {
        id: 1,
        nome:'Space Jam: O jogo do Século',        
        imagem: "https://i.pinimg.com/736x/10/a9/f1/10a9f17ee50426cb6572097e827e217d.jpg",
        genero: "Infantil/Comédia",
        nota:'8.7'      
        
    },
    {
        id: 2,
        nome: 'Demon Slayer: Mugen Train',       
        imagem: 'https://d17lbu6bbzbdc8.cloudfront.net/wp-content/uploads/2021/09/28080018/mugen-train.jpg',
        genero: 'Ação/Fantasia',
        nota: '8.3'                
    }
];

router.get("/", (req, res) => {
    res.send(filmes);
});

router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);
    if(!filme){
        res.status(404).send({error: 'Filme não encontrado'});
        return;
    }
    res.send(filme);
});

router.post("/add", (req, res) => {
    const filme = req.body;

    if(!filme || !filme.nome || !filme.imagem || !filme.genero || !filme.nota) {
        res.status(400).send({
            message: 'Não foi possível cadastrar. Preencha os campos!!'
        })
        return;
    }   

    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: `${filme.nome} cadastrado com sucesso`,
        data: filme
    });
});

router.put('/edit/:id', (req, res) => {
    const filmeEditado = req.body;
    const idParam = req.params.id;
    let index = filmes.findIndex(filme => filme.id == idParam);

    if (index < 0) {
        res.status(404).send({
            error: 'Filme não localizado'
        });
        return;
    }

    filmes[index] = {
        ...filmes[index],
        ...filmeEditado
    }

    res.send({
        message: `Filme ${filmes[index].nome} atualizado com sucesso`,
        data: filmes[index]
    })
});

router.delete('/delete/:id', (req, res) => {
    const idParam = req.params.id;
    const index = filmes.findIndex(filme => filme.id == idParam);
    const titulo = filmes[index];
    filmes.splice(index, 1);

    res.send({
        message: `Filme ${titulo.nome} foi excluído com sucesso`
    })
});

module.exports = router;