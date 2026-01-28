"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookSchema = exports.isbnParamSchema = exports.createBookSchema = void 0;
const zod_1 = require("zod");
exports.createBookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    author: zod_1.z.string().min(1),
    isbn: zod_1.z.string().min(10).max(13),
    shelfLocation: zod_1.z.string().optional(),
    availableQuantity: zod_1.z.number().int().min(0),
});
exports.isbnParamSchema = zod_1.z.object({
    isbn: zod_1.z.string().min(10).max(13),
});
exports.updateBookSchema = exports.createBookSchema.partial();
//# sourceMappingURL=books.schemas.js.map