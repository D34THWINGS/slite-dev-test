"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const { PORT = 1337 } = process.env;
const server = net_1.createServer(connection => {
    console.log('Client connected');
    connection.on('end', () => console.log('Client disconnected'));
    connection.pipe(connection);
});
server.on('error', error => console.error(error));
server.listen(PORT, () => {
    console.log(`Server listens to port ${PORT}`);
});
