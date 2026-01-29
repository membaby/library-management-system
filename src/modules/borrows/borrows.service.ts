import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";


export class BorrowsService {

    async checkoutBook(data: {bookId: number, borrowerId: number, dueAt: Date}) {
        return await prisma.$transaction(async (tx) => {
            // Step 1. Proceed ONLY if available
            const decremented = await tx.book.updateMany({
                where: {
                    id: data.bookId,
                    availableQuantity: { gt: 0 },
                },
                data: {
                    availableQuantity: { decrement: 1 },
                },
            });
        
            if (decremented.count === 0) {
                const book = await tx.book.findUnique({
                    where: { id: data.bookId },
                    select: { id: true, availableQuantity: true },
                });
        
                if (!book) throw Object.assign(new Error("Book not found"), { statusCode: 404 });
                throw Object.assign(new Error("Book is not available"), { statusCode: 409 });
            }
        
            // Step 2. Create borrow record
            try {
                return await tx.borrow.create({
                    data: {
                        bookId: data.bookId,
                        borrowerId: data.borrowerId,
                        dueAt: data.dueAt,
                    },
                });
            } catch (error: any) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003")
                    throw Object.assign(new Error("Borrower not found"), { statusCode: 404 });
                throw error;
            }
        });        
    }

    async returnBook(data: { id: number }) {
        return await prisma.$transaction(async (tx) => {
            // Step 1. Get the borrow
            const borrow = await tx.borrow.findUnique({
                where: { id: data.id },
                select: { id: true, returnedAt: true, bookId: true },
            });
        
            if (!borrow) throw Object.assign(new Error("Borrow not found"), { statusCode: 404 });
            if (borrow.returnedAt) throw Object.assign(new Error("Book already returned"), { statusCode: 409 });
        
            // Step 2. Update the borrow
            const updatedBorrow = await tx.borrow.update({
                where: { id: data.id },
                data: { returnedAt: new Date() },
            });
        
            // Step 3. Increment book quantity atomically
            await tx.book.update({
                where: { id: borrow.bookId },
                data: { availableQuantity: { increment: 1 } },
            });
        
            return updatedBorrow;
        });
    }

    async getBorrows(limit: number, offset: number, borrowerId?: number, bookId?: number, dueAt?: Date, active?: boolean, overdue?: boolean) {
        return await prisma.borrow.findMany({
            skip: offset,
            take: limit,
            where: {
                borrowerId: borrowerId ? { equals: borrowerId } : undefined,
                bookId: bookId ? { equals: bookId } : undefined,
                dueAt: dueAt ? { equals: dueAt } : undefined,
                returnedAt: active ? { equals: null } : undefined,
                ...(overdue === true && {
                    dueAt: { lt: new Date() },
                    returnedAt: { equals: null },
                }),
            },
        });
    }
}