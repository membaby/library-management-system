import { Request, Response } from "express";
import { BooksService } from "./books.service";
import { createBookSchema, updateBookSchema, isbnParamSchema } from "./books.schemas";


const service = new BooksService();

export class BooksController {

    async createBook(req: Request, res: Response) {
        const { title, author, isbn, shelfLocation, availableQuantity } = createBookSchema.parse(req.body);
        await service.createBook({ title, author, isbn, shelfLocation, availableQuantity });
        res.status(200).json({
            status: "success",
            message: "Book created successfully"
        });
    }

    async updateBook(req: Request, res: Response) {
        const { isbn } = isbnParamSchema.parse(req.params);
        const { title, author, shelfLocation, availableQuantity } = updateBookSchema.parse(req.body);
        await service.updateBook({ isbn, title, author, shelfLocation, availableQuantity });
        res.status(200).json({
            status: "success",
            message: "Book updated successfully"
        })
    }

    async deleteBook(req: Request, res: Response) {
        const { isbn } = isbnParamSchema.parse(req.params);
        await service.deleteBook(isbn);
        res.status(200).json({
            status: "success",
            message: "Book deleted successfully"
        });
    }

    async getBooks(req: Request, res: Response) {
        const limit = Number(req.query.limit) || 10;
        const offset = Number(req.query.offset) || 0;
        const title = req.query.title as string;
        const author = req.query.author as string;
        const isbn = req.query.isbn as string;
        const books = await service.getBooks(limit, offset, title, author, isbn);
        res.status(200).json({
            status: "success",
            books: books
        });
    }

}