//ativando botão de envio
function enviarDados() {
  var nome_Livro = document.getElementById("nome_Livro");
  var num_Edicao = document.getElementById("num_Edicao");
  var editora = document.getElementById("editora");
  var nome_Autor = document.getElementById("nome_Autor");
  var isbn = document.getElementById("isbn");
  var quantidade_Estoque = document.getElementById("quantidade_Estoque");

  var botao = document.getElementById("enviar");
  var formValida = true;

  if (!validaNome(nome_Livro)) {
    formValida = false;
  }
  if (!validaEdicao(num_Edicao)) {
    formValida = false;
  }
  if (!validaEditora(editora)) {
    formValida = false;
  }

  if (!validaNome_Autor(nome_Autor)) {
    formValida = false;
    }
  if (!validaISBN(isbn)) {
       formValida = false;
     }
  if (!validaEstoque(quantidade_Estoque)) {
       formValida = false;
     }

  if (!formValida) {
    $("#enviar").attr("type", "button");
    alert(
      "Dados Inválidos! Por favor, verifique os campos em vermelho e tente novamente."
    );
    return formValida;
  } else {
    $("#enviar").attr("type", "submit");
    botao.setAttribute("submit", "");
    alert("Livro Cadastrado");
    return true;
  }
}
