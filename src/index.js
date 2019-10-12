"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const messages_1 = require("./messages");
const { PORT = 1337 } = process.env;
const server = net_1.createServer(connection => {
    messages_1.captureMessage(connection);
    connection.on('error', error => console.error(error));
});
server.on('error', error => console.error(error));
server.listen(PORT, () => {
    console.log(`Server listens to port ${PORT}`);
});
