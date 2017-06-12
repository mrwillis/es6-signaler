/**
 * Created by julia on 6/11/2017.
 */

export default class Room {
    users = [];
    hostSocket = null;
    roomSocket = {};
    hostName = "";

    constructor(parentSocket, roomName, hostName) {
        this.roomSocket = parentSocket.of(`/${roomName}`);
        this.hostName = hostName;
        this.roomSocket.on('connection', (socket) => {
            this.registerHostRequest(socket);
            this.registerJoinRequest(socket);
        })
    }

    registerHostRequest = (socket) => {
        socket.on('apply-to-host', () => {
            if (this.hostSocket === null) {
                this.hostSocket = socket
            }
        })
    };

    registerJoinRequest = (socket) => {
        socket.on('join', () => {
            this.users.push(socket)
        })
    }
}


