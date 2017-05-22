import http from 'http';
import express from 'express'
import SocketIO from 'socket.io'

let app = express();
let server = http.Server(app);
let io = SocketIO(server);


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    "use strict";
   socket.emit('news', {hello: 'world'});
   socket.on('my other event', (data) => {
       console.log(data)
   })
});

server.listen(80, () => {
    "use strict";
    console.log('Listening on port 80');
});
