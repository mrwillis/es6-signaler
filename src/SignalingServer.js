import http from 'http'
import express from 'express'
import SocketIO from 'socket.io'
import Room from './Room'
import bodyParser from 'body-parser'


export default class SignalingServer {
    app = {};
    server = {};
    io = {};
    rooms = {};
    users = [];

    constructor() {
        this.app = express();
        // Middleware to get the JSON data from client.
        this.app.use(bodyParser.json());
        this.server = http.Server(this.app);
        this.io = SocketIO(this.server);
        this.registerRoutes(this.app);

    }

    registerRoutes = (app) => {
        app.post('/create-room', (req, res) => {
            if (req.body.roomName !== undefined){
                this.rooms[req.body.roomName] = Room(this.io, req.body.roomName, req.body.userName);
                res.send('Room created with name:' + req.body.roomName + 'and user host: ' + res.body.userName);
            }
        })
    };

    start = () => {
        this.server.listen(80);
    };
}

