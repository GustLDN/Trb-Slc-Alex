let filmes = [];

// Função para carregar filmes do JSON
async function carregarFilmes() {
    try {
        const response = await fetch('filmes.json');
        filmes = await response.json();
        listarFilmes(); // Listar filmes após o carregamento
    } catch (error) {
        console.error("Erro ao carregar filmes:", error);
    }
}

// Chame a função ao carregar a página
window.onload = function() {
    carregarFilmes();
};

function cadastrarFilme() {
    const nome = document.getElementById("nome").value;
    const classificacao = document.getElementById("classificacao").value;
    const duracao = document.getElementById("duracao").value;
    const genero = document.getElementById("genero").value;
    const ano = document.getElementById("ano").value;
    const sinopse = document.getElementById("sinopse").value;

    const filme = { nome, classificacao, duracao, genero, ano, sinopse };
    filmes.push(filme);
    alert("Filme cadastrado com sucesso!");

    hideForm();
    document.getElementById("form").reset();

    listarFilmes(); // Atualizar a lista de filmes após cadastro
}

function buscarFilme() {
    const nome = document.getElementById("searchName").value;
    const filmeEncontrado = filmes.find(f => f.nome.toLowerCase() === nome.toLowerCase());

    const searchResult = document.getElementById("searchResult");
    searchResult.innerHTML = "";

    if (filmeEncontrado) {
        searchResult.innerHTML = `
            <h3>Detalhes do Filme:</h3>
            <p><strong>Nome:</strong> ${filmeEncontrado.nome}</p>
            <p><strong>Classificação:</strong> ${filmeEncontrado.classificacao}</p>
            <p><strong>Duração:</strong> ${filmeEncontrado.duracao} minutos</p>
            <p><strong>Gênero:</strong> ${filmeEncontrado.genero}</p>
            <p><strong>Ano:</strong> ${filmeEncontrado.ano}</p>
            <p><strong>Sinopse:</strong> ${filmeEncontrado.sinopse}</p>
        `;
    } else {
        searchResult.innerHTML = "<p>Filme não encontrado.</p>";
    }
}

function listarFilmes() {
    const filmesList = document.getElementById("filmesList");
    filmesList.innerHTML = ""; // Limpa a lista antes de atualizar

    filmes.forEach(filme => {
        filmesList.innerHTML += `<li>${filme.nome}</li>`;
    });

    document.getElementById("list").classList.remove("hidden");
}

function excluirFilme() {
    const nome = document.getElementById("deleteName").value;
    filmes = filmes.filter(f => f.nome.toLowerCase() !== nome.toLowerCase());
    alert("Filme excluído, se existia!");

    hideDelete();
    document.getElementById("delete").reset();

    listarFilmes(); // Atualizar a lista de filmes após exclusão
}

function showForm() {
    hideAllSections(); // Oculta todas as seções
    document.getElementById("form").classList.remove("hidden");
}

function hideForm() {
    document.getElementById("form").classList.add("hidden");
}

function showSearch() {
    hideAllSections(); // Oculta todas as seções
    document.getElementById("search").classList.remove("hidden");
}

function hideSearch() {
    document.getElementById("search").classList.add("hidden");
    document.getElementById("search").reset();
}

function showDelete() {
    hideAllSections(); // Oculta todas as seções
    document.getElementById("delete").classList.remove("hidden");
}

function hideDelete() {
    document.getElementById("delete").classList.add("hidden");
    document.getElementById("delete").reset();
}

function hideList() {
    document.getElementById("list").classList.add("hidden");
}

// Função para ocultar todas as seções
function hideAllSections() {
    document.getElementById("form").classList.add("hidden");
    document.getElementById("search").classList.add("hidden");
    document.getElementById("delete").classList.add("hidden");
    document.getElementById("list").classList.add("hidden");
}

function exit() {
    alert("Saindo do catálogo.");
    window.close(); // Funciona na maioria dos navegadores
}
