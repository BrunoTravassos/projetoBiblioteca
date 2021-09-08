function validaNome(nome) {
  if (nome == "" || nome.length < 3) {
    document.getElementById("nome_Livro").style.border = "red solid";
    alert("Nome do Livror deve conter +3 letras");
  } else {
    document.getElementById("nome_Livro").style.border = "green solid";
  }
}

function validaEdicao(edicao) {
  if (edicao == "" || edicao.length < 2) {
    document.getElementById("num_Edicao").style.border = "red solid";
    alert("Numero edição deve conter +2 letras");
  } else {
    document.getElementById("num_Edicao").style.border = "green solid";
  }
}

function validaEditora(editora) {
  if (editora == "" || editora.length < 3) {
    document.getElementById("editora").style.border = "red solid";
    alert("Nome da Editora deve conter +3 letras");
  } else {
    document.getElementById("editora").style.border = "green solid";
  }
}
function validaNome_Autor(autor) {
  if (autor == "" || autor.length < 3) {
    document.getElementById("nome_Autor").style.border = "red solid";
    alert("Nome do(a) Autor(a) deve conter +3 letras");
  } else {
    document.getElementById("nome_Autor").style.border = "green solid";
  }
}
function validaISBN(isbn) {
  if (isbn == "" || isNaN(isbn) || isbn.length < 4) {
    document.getElementById("isbn").style.border = "red solid";
    alert("ISBN deve ter ao minimo 4 numeros!");
  } else {
    document.getElementById("isbn").style.border = "green solid";
  }
}
function validaEstoque(estoque) {
  if (estoque == "" || isNaN(estoque)) {
    document.getElementById("quantidade_Estoque").style.border = "red solid";
    alert("Estoque não pode conter letras!");
  } else {
    document.getElementById("quantidade_Estoque").style.border = "green solid";
  }
}
