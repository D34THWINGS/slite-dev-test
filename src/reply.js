"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reply = (data, statusCode = 200) => ({ data, statusCode });
exports.replyNotFound = () => exports.reply(null, 404);
exports.replySuccess = () => exports.reply(null, 200);
exports.responseToString = ({ data, statusCode }) => `${data !== null ? data : statusCode}\r\n`;
