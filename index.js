const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const desapega = [];
let message = "";

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

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.get("/catalogo", (req, res) => {
res.render("catalogo", {
  desapega,
  message
  });
});

app.post("/new", (req, res) => {
  const produto = req.body;
  desapega.push(produto);
  message = "Item cadastrado com sucesso!";
  res.redirect("/catalogo");
});

app.get("/detalhes/:id", (req, res) => {
  const id = req.params.id;
  const produto = desapega[id];
  res.render("detalhes", {
    produto,
  });
});



app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);