import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";


export class BooksService {

    async createBook(data: {title: string, author: string, isbn: string, shelfLocation?: string, availableQuantity: number}) {
        try {
            return await prisma.book.create({
                data: {...data},
            });
        } catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw Object.assign(new Error("Book with this ISBN already exists"), { statusCode: 409 });
            }
            throw error;
        }
    }

    async updateBook(data: {isbn: string, title?: string, author?: string, shelfLocation?: string, availableQuantity?: number}) {
        try {
            return await prisma.book.update({
                where: { isbn: data.isbn },
                data: {...data},
            });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw Object.assign(new Error("Book with this ISBN already exists"), { statusCode: 409 });
                }
                if (error.code === "P2025") {
                    throw Object.assign(new Error("Book with this ISBN not found"), { statusCode: 404 });
                }
            } else {
                throw error;
            }
        }
    }

    async deleteBook(isbn: string) {
        try {
            return await prisma.book.delete({
                where: { isbn: isbn },
            });
        } catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2025"
            ) {
                throw Object.assign(new Error("Book with this ISBN not found"), { statusCode: 404 });
            }
            throw error;
        }
    }

    async getBooks(limit: number, offset: number, title?: string, author?: string, isbn?: string) {
        return await prisma.book.findMany({
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