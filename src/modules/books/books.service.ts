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

    async updateBook(data: {id: number, isbn?: string, title?: string, author?: string, shelfLocation?: string, availableQuantity?: number}) {
        if (!data.isbn && !data.title && !data.author && !data.shelfLocation && data.availableQuantity === undefined) {
            throw Object.assign(new Error("At least one field to update is required"), { statusCode: 400 });
        }
        try {
            const { id, ...updateData } = data;
            return await prisma.book.update({
                where: { id: id },
                data: {...updateData},
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

    async deleteBook(id: number) {
        return await prisma.$transaction(async (tx) => {
            // Step 1. Find the book (get id)
            const book = await tx.book.findUnique({
                where: { id: id }
            });
        
            if (!book) {
                throw Object.assign(new Error("Book with this ID not found"), { statusCode: 404 });
            }
        
            // Step 2. Ensure no active borrow exists
            const borrowed = await tx.borrow.findFirst({
                where: {
                    bookId: id,
                    returnedAt: { equals: null },
                },
            });
        
            if (borrowed)
                throw Object.assign(new Error("Book is borrowed, cannot delete before returning"), { statusCode: 409 });
        
            // Step 3. Delete historical borrow records
            await tx.borrow.deleteMany({
                where: { bookId: id },
            });
        
            // Step 4. Delete the book
            return await tx.book.delete({
                where: { id: id },
            });
        });
    }

    async getBooks(limit: number, offset: number, id?: number, title?: string, author?: string, isbn?: string) {
        return await prisma.book.findMany({
            where: {
                id: id ? { equals: id } : undefined,
                title: title ? { contains: title, mode: "insensitive" } : undefined,
                author: author ? { contains: author, mode: "insensitive" } : undefined,
                isbn: isbn ? { equals: isbn } : undefined
            },
            skip: offset,
            take: limit,
        });  
    }

}