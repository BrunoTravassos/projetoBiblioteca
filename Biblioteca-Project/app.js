const express = require('express');
var mongoose = require('mongoose');
// const conecta = require("./credentials.json");
// const conecta = require("../Biblioteca/public/js/conecta");
const conecta = require("./conecta");
const app = express()
const port = 3000



//conexao com o banco
mongoose.connect(  
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//configuração da engine
app.set("view engine", "ejs"); // qual engine de visualizaçao
app.set("views", __dirname, "/views"); // qual o diretorio
// app.use(express.urlencoded()); // de uma pag p/ a outra
app.use(express.urlencoded({ extended: true })); // de uma pag p/ a outra
app.use(express.json()); // dados de uma pag p/ a outra atraves de json
app.use(express.static("public"));
//----------------

const Livros = mongoose.model("Livros", {
  nome_Livro: String,
  num_Edicao: String,
  assunto: String,
  editora: String,
  nome_Autor: String,
  isbn: Number,
  quantidade_Estoque: Number,
  pesquisa: String
});

const Clientes = mongoose.model("Clientes", {
  nome: String,
  cpf: Number,
  profissao: String,
  endereco: String,
  cidade: String,
  telefone: Number,
  email: String,
  pesquisa: String,
});

//pagina Inicial
app.get('/', (req, res) => {
    res.render('index');
});
//--------------

//rota e Salvar Cadastro
app.get("/cadastrarLivros", (req, res) => {
  res.render("formLivros");
});

app.get("/cadastrarClientes", (req, res) => {
  res.render("formClientes");
});


//Post p/ salvar no BD
app.post("/cadastrarLivros", (req, res) => {

    // referenciando a pagina
    let livro = new Livros(); // variavel livro recebendo do Model Livros
    livro.nome_Livro = req.body.nome_Livro; 
    livro.num_Edicao = req.body.num_Edicao; 
    livro.assunto = req.body.assunto; 
    livro.editora = req.body.editora; 
    livro.nome_Autor = req.body.nome_Autor; 
    livro.isbn = req.body.isbn; 
    livro.quantidade_Estoque = req.body.quantidade_Estoque; 
  
    livro.save((err) => {
      if (err) {
        return res.status(500).send("Erro ao Cadastrar Livro");
      } else {
        return res.redirect("/relatorioLivros");
      }
    });
});

app.post("/cadastrarClientes", (req, res) => {
  // referenciando a pagina
  let cliente = new Clientes(); 
  cliente.nome = req.body.nome;
  cliente.cpf = req.body.cpf;
  cliente.profissao = req.body.profissao;
  cliente.endereco = req.body.endereco;
  cliente.cidade = req.body.cidade;
  cliente.telefone = req.body.telefone;
  cliente.email = req.body.email;

  cliente.save((err) => {
    if (err) {
      return res.status(500).send("Erro ao Cadastrar Cliente");
    } else {
      return res.redirect("/relatorioClientes");
    }
  });
});

//---------------

//rota para Relatorio Livros

app.get("/relatorioLivros", (req, res) => {
    let consulta = Livros.find({}, (err, livro) => {
        if (err) {
            return res.status(500).send("Erro ao consultar Livros");
        } else {
            res.render("livros", { lista_livros: livro });
        }
    });
});

app.get("/relatorioClientes", (req, res) => {
  let consulta = Clientes.find({}, (err, cliente) => {
    if (err) {
      return res.status(500).send("Erro ao consultar Clientes");
    } else {
      res.render("clientes", { lista_clientes: cliente });
    }
  });
});


//alterar Livro
//carregar pag com o id pesquisado
app.get("/editarLivros/:id", (req, res) => {
  Livros.findById(req.params.id, (err, livro) => {
    if (err) {
      return res.status(500).send("Erro ao consultar Livro");
    } else {
      res.render("formEditLivros", { lista_livros: livro });
    }
  });
});

//Salvar alteração
app.post("/editarLivros", (req, res) => {
  var id = req.body.id;
  Livros.findById(id, (err, livro) => {
    if (err) {
      return res.status(500).send("Erro ao atualizar Livro");
    } else {
      livro.nome_Livro = req.body.nome_Livro;
      livro.num_Edicao = req.body.num_Edicao;
      livro.assunto = req.body.assunto;
      livro.editora = req.body.editora;
      livro.nome_Autor = req.body.nome_Autor;
      livro.isbn = req.body.isbn;
      livro.quantidade_Estoque = req.body.quantidade_Estoque;

      livro.save((err) => {
        if (err) {
          return res.status(500).send("Erro ao Atualizar Livro");
        } else {
          return res.redirect("/relatorioLivros");
        }
      });
    }
  });
});


app.get("/editarClientes/:id", (req, res) => {
  Clientes.findById(req.params.id, (err, cliente) => {
    if (err) {
      return res.status(500).send("Erro ao consultar Cliente");
    } else {
      res.render("formEditClientes", { lista_cliente: cliente });
    }
  });
});

//Salvar alteração
app.post("/editarClientes", (req, res) => {
  var id = req.body.id;
  Clientes.findById(id, (err, cliente) => {
    if (err) {
      return res.status(500).send("Erro ao atualizar Cliente");
    } else {
      cliente.nome = req.body.nome;
      cliente.cpf = req.body.cpf;
      cliente.profissao = req.body.profissao;
      cliente.endereco = req.body.endereco;
      cliente.cidade = req.body.cidade;
      cliente.telefone = req.body.telefone;
      cliente.email = req.body.email;

      cliente.save((err) => {
        if (err) {
          return res.status(500).send("Erro ao Atualizar Cliente");
        } else {
          return res.redirect("/relatorioClientes");
        }
      });
    }
  });
});


//----------------------

//Deletando

app.get("/deletarLivros/:id", (req, res) => {
    var id = req.params.id;

    Livros.deleteOne({ _id: id }, (err, result) => {
        if (err) {
          return res.status(500).send("Erro ao Excluir Livro");
        } else {
          return res.redirect("/relatorioLivros");
        }
    })
});

app.get("/deletarClientes/:id", (req, res) => {
  var id = req.params.id;

  Clientes.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      return res.status(500).send("Erro ao Excluir Clientes");
    } else {
      return res.redirect("/relatorioClientes");
    }
  });
});


//Pesquisa

app.get("/relatorioLivros/:pesquisar:tipo_pesquisa", (req, res) => {
  var tp_pesq = req.query.tipo_pesquisa;
  var pesquisa = req.query.pesquisar;
  console.log(tp_pesq);
  console.log(pesquisa);
  if (tp_pesq == "nome_Livro") {
    Livros.find(
      { nome_Livro: { $regex: new RegExp("^.*" + pesquisa + ".*$", "i") } },
     (err, pesquisar) => {
        if (err) {
          return res.status(500).send("Erro ao consultar Livro");
        } else {
          res.render("livros", { lista_livros: pesquisar });
        }
      }
    );
  } else if (tp_pesq == "nome_Autor") {
    Livros.find(
      { nome_Autor: { $regex: new RegExp("^.*" + pesquisa + ".*$", "i") } },
      (err, pesquisar) => {
        if (err) {
          return res.status(500).send("Erro ao consultar Livro");
        } else {
          res.render("livros", { lista_livros: pesquisar });
        }
      }
    );
  } else if (tp_pesq == "editora") {
    Livros.find(
      { editora: { $regex: new RegExp("^.*" + pesquisa + ".*$", "i") } },
      (err, pesquisar) => {
        if (err) {
          return res.status(500).send("Erro ao consultar Livro");
        } else {
          res.render("livros", { lista_livros: pesquisar });
        }
      }
    );
  } else if(tp_pesq == "assunto") {
    Livros.find(
      { assunto: { $regex: new RegExp("^.*" + pesquisa + ".*$", "i") } },
      (err, pesquisar) => {
        if (err) {
          return res.status(500).send("Erro ao consultar Livro");
        } else {
          res.render("livros", { lista_livros: pesquisar });
        }
      }
    );
  }
    
});

app.get("/relatorioClientes/:pesquisar:tipo_pesquisa", (req, res) => {
  var tp_pesq = req.query.tipo_pesquisa;
  var pesquisa = req.query.pesquisar;
  console.log(tp_pesq);
  console.log(pesquisa);
  if (tp_pesq == "nome") {
    Clientes.find(
      { nome: { $regex: new RegExp("^.*" + pesquisa + ".*$", "i") } },
      (err, pesquisar) => {
        if (err) {
          return res.status(500).send("Erro ao consultar Cliente");
        } else {
          res.render("clientes", { lista_clientes: pesquisar });
        }
      }
    );
  } else if (tp_pesq == "cpf") {
    Clientes.find(
      { cpf: { $regex: new RegExp("^.*" + pesquisa + ".*$", "i") } },
      (err, pesquisar) => {
        if (err) {
          return res.status(500).send("Erro ao consultar Cliente");
        } else {
          res.render("cliente", { lista_clientes: pesquisar });
        }
      }
    );
  }
});


app.listen(port, () => console.log(`Servidor rodando na porta: ` + port));