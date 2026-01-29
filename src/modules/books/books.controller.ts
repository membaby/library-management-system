import { Request, Response } from "express";
import { BooksService } from "./books.service";
import { createBookSchema, updateBookSchema } from "./books.schemas";
import { idParamSchema, paginationQuerySchema } from "../common/common.schemas";


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
        const { id } = idParamSchema.parse(req.params);
        const { isbn, title, author, shelfLocation, availableQuantity } = updateBookSchema.parse(req.body);
        await service.updateBook({ id, isbn, title, author, shelfLocation, availableQuantity });
        res.status(200).json({
            status: "success",
            message: "Book updated successfully"
        })
    }

    async deleteBook(req: Request, res: Response) {
        const { id } = idParamSchema.parse(req.params);
        await service.deleteBook(id);
        res.status(200).json({
            status: "success",
            message: "Book deleted successfully"
        });
    }

    async getBooks(req: Request, res: Response) {
        // const limit = Number(req.query.limit) || 10;
        // const offset = Number(req.query.offset) || 0;
        const { limit, offset } = paginationQuerySchema.parse(req.query);
        const title = req.query.title as string;
        const author = req.query.author as string;
        const isbn = req.query.isbn as string;
        const id = Number(req.query.id);
        const books = await service.getBooks(limit, offset, id, title, author, isbn);
        res.status(200).json({
            status: "success",
            books: books
        });
    }

}