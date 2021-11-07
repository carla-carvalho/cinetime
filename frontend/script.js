const infos = document.getElementById('infos');
const apiUrl = 'http://localhost:3000';

let edicao = false;
let idEdicao = 0;

const watched = './img/watched.png'
const unwatched = './img/unwatched.png'

let titulo = document.getElementById('titulo');
let imagem = document.getElementById('imagem');
let genero = document.getElementById('genero');
let nota = document.getElementById('nota');


const getFilmes = async () => {
    const response = await fetch(apiUrl)
    const filmes = await response.json();

    console.log(filmes);

    filmes.map((filme) => {
        if(filme.assistido == false) {
            filme.assistido = unwatched
          }
          else {
            filme.assistido = watched
          }
        infos.insertAdjacentHTML('beforeend', `
        <div class="col">
        <div class="card text-white bg-dark mb-1 mt-3" style="max-width: 200px;">
        <div class="row g-0">
            <img src="${filme.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${filme.titulo}</h5>
                <span class="badge bg-secondary">${filme.genero}</span>
                <br>
                <span class="badge text-dark bg-warning">${filme.nota}</span>
                <button type="button" class="btn btn-link" onclick="editAssistido(${filme.id})" id="img_watched-unwatched" data-toggle="tooltip" data-placement="top" title="Marcar como assistido"><img src=${filme.assistido}></button>
                <br>
                <br>
                <div>
                    <button class="btn btn-outline-light" onclick="editFilme('${filme.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteFilme('${filme.id}')">Excluir</button>
                    
                </div>
            </div>
            </div>
        </div>
        `)
    })
}

const submitForm = async (event) => {
event.preventDefault();

const filme = {
    titulo: titulo.value,
    imagem: imagem.value,
    genero: genero.value,
    nota: nota.value
}

if(edicao){
    putFilme(filme, idEdicao);
}
else {
    createFilme(filme);
}

clearFields();
infos.innerHTML = '';

}

const createFilme = async (filme) => {
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers ({
            'Content-Type': 'application/json'
        })
    })
    
    const response = await fetch(request);
    const result = await response.json();
    
    alert(result.message);
    
getFilmes();

    
}

const putFilme = async (filme, id) => {
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify(filme),
        headers: new Headers ({
            'Content-Type': 'application/json'
        })
    })
    
    const response = await fetch(request);
    const result = await response.json();
    
    alert(result.message);
    edicao = false;
    idEdicao = 0;
    getFilmes();

}

const deleteFilme = async  (id) =>{
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
})

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    infos.innerHTML = '';
    getFilmes();
    
}

const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}

const editFilme = async (id) => {
    edicao = true;
    idEdicao = id;

    const filme = await getFilmeById(id);

    titulo.value = filme.titulo;
    imagem.value = filme.imagem;
    genero.value = filme.genero;
    nota.value = filme.nota;

}


const editAssistido = async (id) => {
    const filme = await getFilmeById(id);
  
    const request = new Request(`${apiUrl}/editAssistido/${id}`, {
      method: 'PUT',
      body: JSON.stringify(filme),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    })
    const response = await fetch(request);
    const result = await response.json();
    infos.innerHTML = '';
    getFilmes();
  
  }
 
const clearFields = () => {
    titulo.value = '';
    imagem.value = '';
    genero.value = '';
    nota.value = '';
}

getFilmes();