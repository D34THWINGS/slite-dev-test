"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("./get");
const create_1 = require("./create");
const remove_1 = require("./remove");
const format_1 = require("./format");
const insert_1 = require("./insert");
var CommandType;
(function (CommandType) {
    CommandType["Format"] = "format";
    CommandType["Insert"] = "insert";
    CommandType["Get"] = "get";
    CommandType["Create"] = "create";
    CommandType["Delete"] = "delete";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
exports.commands = {
    [CommandType.Get]: get_1.get,
    [CommandType.Create]: create_1.create,
    [CommandType.Delete]: remove_1.remove,
    [CommandType.Format]: format_1.format,
    [CommandType.Insert]: insert_1.insert,
};
