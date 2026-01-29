import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";


export class BorrowersService {

    async createBorrower(data: {name: string, email: string}) {
        try {
            return await prisma.borrower.create({
                data: {...data},
            });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
                throw Object.assign(new Error("Borrower with this email already exists"), { statusCode: 409 });
            throw error;
        }
    }

    async updateBorrower(data: {id: number, name?: string, email?: string}) {
        if (!data.name && !data.email)
            throw Object.assign(new Error("At least one field to update is required"), { statusCode: 400 });
        try {
            return await prisma.borrower.update({
                where: { id: data.id },
                data: {...data},
            });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw Object.assign(new Error("Borrower with this email already exists"), { statusCode: 409 });
                else if (error.code === "P2025")
                    throw Object.assign(new Error("Borrower not found"), { statusCode: 404 });
                else
                    throw error;
            }
            throw error;
        }
    }

    async deleteBorrower(id: number) {
        try {
            // Assumption: We allow deletion only if the borrower has no active books borrowed
            const activeBooks = await prisma.borrow.findMany({
                where: {
                    borrowerId: id,
                    returnedAt: null,
                },
            });
            if (activeBooks.length > 0)
                throw Object.assign(new Error("Borrower has active books borrowed"), { statusCode: 409 });
            else {
                // Delete history of books borrowed by the borrower
                await prisma.borrow.deleteMany({
                    where: { borrowerId: id },
                });
                // Delete the borrower
                return await prisma.borrower.delete({
                    where: { id: id },
                });
            }
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025")
                throw Object.assign(new Error("Borrower not found"), { statusCode: 404 });
            throw error;
        }
    }

    async getBorrowers(limit: number, offset: number, id?: number, name?: string, email?: string) {
        return await prisma.borrower.findMany({
            where: {
                id: id ? { equals: id } : undefined,
                name: name ? { contains: name, mode: "insensitive" } : undefined,
                email: email ? { contains: email, mode: "insensitive" } : undefined,
            },
            skip: offset,
            take: limit,
        });  
    }

}