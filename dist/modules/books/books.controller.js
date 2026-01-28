"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const books_service_1 = require("./books.service");
const books_schemas_1 = require("./books.schemas");
const service = new books_service_1.BooksService();
class BooksController {
    async createBook(req, res) {
        const { title, author, isbn, shelfLocation, availableQuantity } = books_schemas_1.createBookSchema.parse(req.body);
        await service.createBook({ title, author, isbn, shelfLocation, availableQuantity });
        res.status(200).json({
            status: "success",
            message: "Book created successfully"
        });
    }
    async updateBook(req, res) {
        const { isbn } = books_schemas_1.isbnParamSchema.parse(req.params);
        const { title, author, shelfLocation, availableQuantity } = books_schemas_1.updateBookSchema.parse(req.body);
        await service.updateBook({ isbn, title, author, shelfLocation, availableQuantity });
        res.status(200).json({
            status: "success",
            message: "Book updated successfully"
        });
    }
    async deleteBook(req, res) {
        const { isbn } = books_schemas_1.isbnParamSchema.parse(req.params);
        await service.deleteBook(isbn);
        res.status(200).json({
            status: "success",
            message: "Book deleted successfully"
        });
    }
    async getBooks(req, res) {
        const limit = Number(req.query.limit) || 10;
        const offset = Number(req.query.offset) || 0;
        const title = req.query.title;
        const author = req.query.author;
        const isbn = req.query.isbn;
        const books = await service.getBooks(limit, offset, title, author, isbn);
        res.status(200).json({
            status: "success",
            books: books
        });
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map