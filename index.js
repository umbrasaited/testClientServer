var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var db = require("./db");

var dataBase = new db();

//sita kodo dalis veiks visada, kada paleisi programa. this means, kad sitoj vietoj gali per konsoles langa susivest/isvest duomenis.
http.listen(3000, function() {
  console.log("listening on *:3000");
  //Dovile, kolkas tau uzteks pasitestuot viska sitoj vietoj
  //kai pasikursi funkcijas db.js faile, testuok jas rasydama:
  //dataBase.init();
  //database.createNewUser(duomenys);
  //database.confirmLogin(duomenys);
  //"duomenys" turetu but javascript objektas {property1: value1, property2: value2, property3: value3}
  //musu atveju pavyzdys: {username: "user1", password: "pass", confirmPassword: "pass"}
  //log in funkcijai reikes tik username ir password
  //funkcijos grazint turetu reiksmes, pagal kurias pranesim client'ui, ar pavyko prisiregistruot ir prisijungt ar ne (kaip tai atrodo gali pamatyt apacioj)
  //
});

//sita kodo dalis neveiks, kol neprisijungsi prie serverio adresu IP:3000 (tau jos kaip ir nereik kolkas)
io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("sign-up", data => {
    let errCode = dataBase.createNewUser(data);
    if (!errCode) {
      socket.emit("successful-sign-up");
    } else {
      switch (errCode) {
        case 1:
          socket.emit("username-too-short");
        case 2:
          socket.emit("password-too-short");
        case 3:
          socket.emit("password-not-match");
        case 4:
          socket.emit("username-taken");
      }
    }
  });

  socket.on("log-in", data => {
    let success = dataBase.confirmLogin(data);
    if (success) {
      socket.emit("login-success");
    } else {
      socket.emit("login-failed");
    }
  });
});
