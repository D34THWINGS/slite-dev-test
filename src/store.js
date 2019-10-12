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
const createStore = () => {
    const documents = new Map();
    return {
        insert: (id) => __awaiter(void 0, void 0, void 0, function* () { return documents.set(id, { id, data: '', styles: [] }); }),
        update: (id, partial) => __awaiter(void 0, void 0, void 0, function* () {
            const document = documents.get(id);
            if (!document) {
                return null;
            }
            const updatedDocument = Object.assign(Object.assign({}, document), partial);
            documents.set(id, updatedDocument);
            return updatedDocument;
        }),
        delete: (id) => __awaiter(void 0, void 0, void 0, function* () { return documents.delete(id); }),
        findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
            const document = documents.get(id);
            return typeof document === 'undefined' ? null : document;
        }),
    };
};
exports.store = createStore();
