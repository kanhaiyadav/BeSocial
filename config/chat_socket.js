module.exports.chatSocket = function (socketServer) {
    let io = require("socket.io")(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
        }
    });
    //io is the socket.io server instance created in the previous lines using require("socket.io")(socketServer, {...}).
    //sockets is a namespace in socket.io that represents all the connected clients.
    //here we are listening for the connection event emit from client side(note we don't need to send acknowledge for
    //connection explicitly is already done by the server under the hood)
    io.sockets.on('connection', function (socket) {
        //here also the socket parameter represents the individual connection of the server with the client.
        console.log('new connection received', socket.id);

        //now we listen for the 'join_room' event emitted by the client
        socket.on('join_room', function (data) {
            console.log('joining request received..', data);

            //now we join the room
            socket.join(data.chatroom);
            //the server emit the message to everone in the room that this user has joined
            io.in(data.chatroom).emit('user_joined', data);
        })
        socket.on('send_message', function (data) {
            io.in(data.chatroom).emit('receive_message', data);
        })
    })
}