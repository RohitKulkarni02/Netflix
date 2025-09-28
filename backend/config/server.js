#!/usr/bin/env node

var express = require("express"), // see expressjs.com
    socket_io = require("socket.io"); // see socket.io

var app = express.createServer(),
    io = socket_io.listen(app);

// List of connected clients
var clients = [];

app.configure(function() {
  // We want bodyParser so we can push JSON from PHP
  app.use(express.bodyParser());
  // and logger so we can see requests etc
  app.use(express.logger());
});

app.post("/my-secret-api", function(req, res) {
  // Need something to send!
  if (!req.body || req.body.type) {
    res.send(406);
  }

  // Let the remote end get on with whatever it was doing
  res.send(200);

  // Push the content of the request to the clients
  clients.forEach(function(client) {
    client.emit(req.body.type, req.body.data);
  });
});

io.sockets.on("connection", function(socket) {
  // Push the client onto the list when it connects
  clients.push(socket);

  // Make sure we remove the client from the list when it disconnects
  socket.on("disconnect", function() {
    for (var i=0;i<clients.length;++i) {
      if (clients[i] == socket) {
        clients.splice(i, 1);
        break;
      }
    }
  });
});

app.listen(3000);
