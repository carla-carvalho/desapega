require('dotenv').config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const desapega = [];
let message = "";

const Produto = require("./models/projeto");
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);

  res.render("index", {
    desapega,
  });
});

// app.get("/doar", (req, res) => {
//   res.render("doar");
// });

app.get("/dev", (req, res) => {
  res.render("dev");
});

app.get("/doacoes", (req, res) => {
res.render("doacoes", {
  desapega,
  message,
  });
});


app.get("/login", (req, res) => {
    setTimeout(() => {
      message = "";
    }, 1000);
    res.render("login", {message})//ver virgula
  });

app.post("/doar", (req, res) => {
 const login = req.body.email
 const senha = req.body.senha
if (login == "blue@blue.com" && senha =="blue"){
  res.render("doar");
}

else{
  message = "Usuário ou senha inválidos"
  res.render("login");
}
  });

  app.get("/inscrever", (req, res) => {
    res.render("inscrever", {
      desapega,
      message,
      });
    });

app.post("/new", (req, res) => {
  const produto = req.body;
  desapega.push(produto);
  message = "Item cadastrado com sucesso!",
  res.redirect("/doacoes");
});

app.post("/doar", (req, res) => {
  res.redirect("/doar");
});

app.get("/detalhes/:id", (req, res) => {
  const id = req.params.id;
  const produto = desapega[id];
  res.render("detalhes", {
    produto,
  });
});

app.get("/editar/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    res.render("editar", {
      produto,
      message: "Produto não encontrado!",
    });
  }

  res.render("editar", {
    produto, message
  });
});




//U (Update) do meu CRUD - Aqui é onde eu faço a atualização (edição) dos dados de uma entrada
app.post("/editar/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  const { nome_produto, tipo_produto, descricao_produto, bairro, municipio, imagem } = req.body;
  
  produto.nome_produto = nome_produto;
  produto.tipo_produto = tipo_produto;
  produto.descricao_produto = descricao_produto;
  produto.bairro = bairro;
  produto.municipio = municipio;
  produto.imagem = imagem;

  const produtoEditado = await produto.save();

  res.render("editar", {
    produto: produtoEditado,
    message: "Produto editado com sucesso!",
  });
});

app.get("/deletar/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    res.render("deletar", {
      produto,
      message: "Produto não encontrado!",
    });
  }

  res.render("deletar", {
    produto, message
  });
});



app.post("/deletar/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    res.render("deletar", {
      mensagem: "Doação não encontrado!",
    });
  }

  await produto.destroy();

  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);