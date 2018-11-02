var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var db = require("./db");

var dataBase = new db();
http.listen(3000, function() {
  console.log("listening on *:3000");
  dataBase.init();
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("sign_up", data => {});
});
