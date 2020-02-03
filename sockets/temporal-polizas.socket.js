const sockets = {};

sockets.init = (server) => {
    // socket.io setup
    const io = require('socket.io').listen(server);
    io.on('connection', (socket) => {
        socket.on('message', (data) => {
            io.sockets.emit('message', data);
        });
    });
};

module.exports = sockets;