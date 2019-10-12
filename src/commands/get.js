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
const getStyleMarkdown = (style) => {
    switch (style) {
        case 'bold': return '**';
        case 'italic': return '*';
        default: return '';
    }
};
const applyStyleToText = (text, documentStyle) => {
    return text.slice(0, documentStyle.start)
        + getStyleMarkdown(documentStyle.style)
        + text.slice(documentStyle.start, documentStyle.end)
        + getStyleMarkdown(documentStyle.style)
        + text.slice(documentStyle.end);
};
exports.get = (docId, format = 'txt') => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield store_1.store.findById(docId);
    if (document === null) {
        return reply_1.replyNotFound();
    }
    if (format === 'md') {
        return reply_1.reply(document.styles.reduce(applyStyleToText, document.data));
    }
    return reply_1.reply(document.data);
});
