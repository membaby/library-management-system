"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const prisma_1 = require("../../config/prisma");
const client_1 = require("@prisma/client");
class BooksService {
    async createBook(data) {
        try {
            return await prisma_1.prisma.book.create({
                data: { ...data },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002") {
                throw Object.assign(new Error("Book with this ISBN already exists"), { statusCode: 409 });
            }
            throw error;
        }
    }
    async updateBook(data) {
        try {
            return await prisma_1.prisma.book.update({
                where: { isbn: data.isbn },
                data: { ...data },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw Object.assign(new Error("Book with this ISBN already exists"), { statusCode: 409 });
                }
                if (error.code === "P2025") {
                    throw Object.assign(new Error("Book with this ISBN not found"), { statusCode: 404 });
                }
            }
            else {
                throw error;
            }
        }
    }
    async deleteBook(isbn) {
        try {
            return await prisma_1.prisma.book.delete({
                where: { isbn: isbn },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025") {
                throw Object.assign(new Error("Book with this ISBN not found"), { statusCode: 404 });
            }
            throw error;
        }
    }
    async getBooks(limit, offset, title, author, isbn) {
        return await prisma_1.prisma.book.findMany({
            where: {
                title: title ? { contains: title, mode: "insensitive" } : undefined,
                author: author ? { contains: author, mode: "insensitive" } : undefined,
                isbn: isbn ? { equals: isbn } : undefined,
            },
            skip: offset,
            take: limit,
        });
    }
}
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map