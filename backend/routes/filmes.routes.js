const express = require('express');

const router = express.Router();

const filmes = [
    {
        id: 1,
        titulo: 'Avatar',
        imagem: 'https://jovemnerd.com.br/wp-content/uploads/img_avatar_2011.jpg',
        genero: 'Aventura',
        nota: '9',
        assistido: false
    },

    {
        id: 2,
        titulo: 'Avengers',
        imagem: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
        genero: 'Ação',
        nota: '9.5',
        assistido: true
    },

    {
        id: 3,
        titulo: 'Mother',
        imagem: 'https://trecobox.com.br/wp-content/uploads/2017/05/jlawmother.jpg',
        genero: 'Drama',
        nota: '10',
        assistido: true
    },
]

router.get('/', (req, res) => {
    res.send(filmes);
})

router.get('/:id', (req, res) =>{
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);
    res.send(filme);
    })

router.post('/add', (req, res) => {
    const filme = req.body;
    filme.id = Date.now();
    filme.assistido = false;
    filmes.push(filme);
    res.status(201).send({
        message: 'Filme cadastrado com sucesso', 
        data: filme
    });
})

router.put('/edit/:id', (req, res) =>{
    const filmeEdit = req.body;
    const idParam = req.params.id;
    let index = filmes.findIndex(filme => filme.id == idParam);

    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }
    res.send({
        message: "Filme atualizado com sucesso",
        data: filmes[index]
    })
});

router.put('/editAssistido/:id', (req, res) =>{
    const filmeEdit = req.body;
    const idParam = req.params.id;
    let index = filmes.findIndex(filme => filme.id == idParam);

    if(filmeEdit.assistido == false) {
        filmeEdit.assistido = true;
      }
      else {
        filmeEdit.assistido = false;
      }

    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }
    res.send({
        message: "Filme atualizado com sucesso",
        data: filmes[index]
    })
});


router.delete('/delete/:id', (req, res) => {
    const idParam = req.params.id;
    const index = filmes.findIndex(filme => filme.id == idParam);
    filmes.splice(index,1);
    res.send({
        message: "Filme excluído com sucesso"
    })
    
})

module.exports = router;