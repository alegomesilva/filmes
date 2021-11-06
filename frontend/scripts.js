const lista = document.getElementById('lista');
const apiUrl = 'http://localhost:3000/filmes';

let edicao = false;
let idEdit = 0;

let nome = document.getElementById('nome');
let imagem = document.getElementById('imagem');
let genero = document.getElementById('genero');
let nota = document.getElementById('nota');

const getFilme = async () => {
    
    const response = await fetch(apiUrl)
    const filmes = await response.json();
    
    filmes.map((filme) => {
        lista.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <img src="${filme.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${filme.nome}</h5>
                <span class="badge bg-primary">${filme.genero}</span>
                <p class="card-text"></p>
                <p class="card-text">${filme.nota}</p>
                <div>
                    <button class="btn btn-primary" onclick="editFilme('${filme.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="delFilme('${filme.id}')">Excluir</button>
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
        nome: nome.value,
        imagem: imagem.value,        
        genero: genero.value,
        nota: parseFloat(nota.value)
    }

    if(edicao){
        putFilme(filme, idEdit);
    } else{
        createFilme(filme);
    }

    clearFields();
    lista.innerHTML = '';

}

const createFilme = async(filme) => {
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    const response = await fetch(request);
    const result = await response.json();
    alert(result.message);
    getFilme();
}

const putFilme = async(filme, id) => {
    const request = new Request(`${apiUrl}/edit/${id}`,{
        method: 'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    const response = await fetch(request);
    const result = await response.json();
    alert(result.message)
    edicao = false;
    idEdit = 0;
    getFilme();
}

const delFilme = async (id) => {
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();
    alert(result.message);

    lista.innerHTML = '';
    getFilme();
}

const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}

const editFilme = async(id) => {
    edicao = true;
    idEdit = id;

    const filme = await getFilmeById(id);

    nome.value = filme.nome;
    imagem.value = filme.imagem;
    genero.value = filme.genero;
    nota.value = filme.nota;
    
}

const clearFields = () => {

    nome.value = '';
    imagem.value = '';    
    genero.value = '';
    nota.value = '';
    
}

getFilme();

