//The client has to request for the connection first always
class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        //this line is sending (or emmitting) a connection request to the socket server(to chat_socket.js file)
        //once the connection is acknowledged by the server, connect event occurs the socket in the next line represents
        //connection with the server(note the connect event is handled by connectionHandler())
        this.socket = io.connect('http://localhost:5000');
        if (this.userEmail) {
            this.connectionHandler();
        }
    }
    connectionHandler() {
        let self = this;
        //here connect event is handled and we log the message connection is established
        //once connection is established its time to create chatroom(A chat room is a virtual 
        //communication space where multiple users can communicate with each other in real - time.It allows 
        //users to send messages that are broadcast to everyone else in the room,)
        this.socket.on('connect', () => {
            console.log('connection established');
            //using emit we are sending a message to the server and using on we are listening for the events
            //as already said socket represents the individual connection of client with the server
            //now we send the request to join the chatroom
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            })

            self.socket.on('user_joined', (data) => {
                console.log(`user with email ${data.user_email} joined`);
            })
        })

        document.querySelector('#message-form button').addEventListener('click', (event) => {
            event.preventDefault();
            let msg = document.querySelector('#message-form textarea').value;
            document.querySelector('#message-form textarea').value = '';

            self.socket.emit('send_message', {
                message: msg,
                user_email: self.userEmail,
                chatroom: 'codeial'
            })
        })
        self.socket.on('receive_message', function (data) {
            console.log('message received', data.message);
            let message = document.createElement('div');
            if (data.user_email == self.userEmail) {
                message.setAttribute('class', 'my message');
            }
            else {
                message.setAttribute('class', 'other message');
            }
            message.innerHTML = `<p>${data.message}</p>`;

            document.querySelector('#messages').appendChild(message);
        })
    }
}