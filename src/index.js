import http from 'http';
import express from 'express'
import SocketIO from 'socket.io'

let app = express();
let server = http.Server(app);
let io = SocketIO(server);

let users = {};


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    "use strict";
    console.log('a new user connected');

    socket.on('login', (username) => {
        console.log("User logged in", username);
        if (users[username]) {
            socket.to(socket.id).emit({success: false})
        }
        else {
            socket.username = username;
            users[username] = socket;
            socket.to(socket.id).emit({success: true})
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
        if (users[socket.username]) {
            delete users[socket.username]
        }
    });
});

server.listen(80, () => {
    "use strict";
    console.log('Listening on port 80');
});
