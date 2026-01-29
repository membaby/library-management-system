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
            const { id, ...updateData } = data;
            return await prisma.borrower.update({
                where: { id: id },
                data: {...updateData},
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
        return await prisma.$transaction(async (tx) => {
            // Step 1. Check if borrower exists
            const borrower = await tx.borrower.findUnique({
                where: { id },
                select: { id: true },
            });
            if (!borrower) {
                throw Object.assign(new Error("Borrower with this ID not found"), { statusCode: 404 });
            }
      
            // Step 2. Check active borrows
            const activeCount = await tx.borrow.count({
                where: { borrowerId: id, returnedAt: { equals: null } },
            });
      
            if (activeCount > 0) {
                throw Object.assign(new Error("Borrower has active books borrowed"), { statusCode: 409 });
            }
      
            // Step 3. Delete borrow history
            await tx.borrow.deleteMany({
                where: { borrowerId: id },
            });
      
            // Step 4. Delete borrower
            return await tx.borrower.delete({
                where: { id: id },
            });
        });      
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