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

// app.get("/doar", (req, res) => {
//   res.render("doar");
// });

app.get("/dev", (req, res) => {
  res.render("dev");
});

app.get("/doacoes", (req, res) => {
res.render("doacoes", {
  desapega,
  message
  });
});


app.get("/login", (req, res) => {
    setTimeout(() => {
      message = "";
    }, 1000);
    res.render("login", {message})
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
      message
      });
    });

app.post("/new", (req, res) => {
  const produto = req.body;
  desapega.push(produto);
  message = "Item cadastrado com sucesso!";
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



app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);