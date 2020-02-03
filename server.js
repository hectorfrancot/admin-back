const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
// or extend node.js with this new type
require('enum').register();
const os = require('os');

// Sequelize
const sequelize = require('./config/database/database');

const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);


server.on("error", onError);
server.on("listening", onListening);
const io = require('socket.io')(server);
server.timeout = 1000000;

// listen to socket connections
io.on('connection', function(socket) {
    // get that socket and listen to events
    console.log('client connected!');
    socket.on('chat message', function(msg) {
        // emit data from the server
        io.emit('chat message', msg);
    });
    global.io = io;
});
// Tip: add the `io` reference to the request object through a middleware like so:
app.use((req, res, next) => {
    global.io = io;
    next();
});

sequelize.sync()
    .then(result => {
        server.listen(port);
    }).catch(err => {console.log(err)});