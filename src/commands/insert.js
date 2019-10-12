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
const getUpdatedStyles = (documentStyles, insertPosition) => documentStyles.map(documentStyle => {
    if (insertPosition >= documentStyle.start && insertPosition < documentStyle.end) {
        return Object.assign(Object.assign({}, documentStyle), { end: documentStyle.end + insertPosition });
    }
    return documentStyle;
});
exports.insert = (docId, positionOrText, text) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield store_1.store.findById(docId);
    if (document === null) {
        return reply_1.replyNotFound();
    }
    const insertedText = typeof text === 'undefined' ? positionOrText : text;
    const positionInt = parseInt(positionOrText) || document.data.length;
    const editedText = document.data.slice(0, positionInt) + insertedText + document.data.slice(positionInt);
    yield store_1.store.update(docId, { data: editedText, styles: getUpdatedStyles(document.styles, positionInt) });
    return reply_1.replySuccess();
});
