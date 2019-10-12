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
const reply_1 = require("../reply");
const store_1 = require("../store");
exports.format = (docId, positionStart, positionEnd, style) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield store_1.store.findById(docId);
    if (document === null) {
        return reply_1.replyNotFound();
    }
    const start = parseInt(positionStart, 10) || 0;
    const end = parseInt(positionEnd, 10) || document.data.length - 1;
    yield store_1.store.update(docId, { styles: [...document.styles, { style, start, end }] });
    return reply_1.replySuccess();
});
