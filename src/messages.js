"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const reply_1 = require("./reply");
exports.processMessage = (message) => {
    const [messageType, ...messageArguments] = message.toString().replace(/\n$/, '').split(':');
    return [messageType, ...messageArguments];
};
exports.callHandler = (type, ...args) => {
    if (!commands_1.commands[type])
        throw new Error('notImplemented');
    return Promise.resolve(commands_1.commands[type](...args));
};
exports.handleMessage = (socket, type, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    try {
        response = yield exports.callHandler(type, ...args);
    }
    catch (e) {
        console.log(e, e instanceof Error);
        response = e instanceof Error ? reply_1.reply(null, 500) : e;
    }
    console.log(`Request: ${type}:${args.join(':')}`);
    console.log('Replying:', reply_1.responseToString(response));
    socket.end(reply_1.responseToString(response), 'utf8');
    socket.pipe(socket);
});
exports.captureMessage = (socket) => {
    let buffer = Buffer.from([]);
    socket.on('data', (data) => {
        buffer = Buffer.concat([buffer, data], buffer.length + data.length);
        exports.handleMessage(socket, ...exports.processMessage(buffer));
    });
};
