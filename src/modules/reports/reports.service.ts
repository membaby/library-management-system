import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";


export class ReportsService {

    async analyzeBorrows(data: {startDate: Date, endDate: Date}) {
        const borrows = await prisma.borrow.findMany({
            where: {
                createdAt: {
                    gte: data.startDate,
                    lte: data.endDate,
                },
            },
        });

        const total_borrows = borrows.length;
        const total_returns = borrows.filter(borrow => borrow.returnedAt !== null).length;
        const total_active = borrows.filter(borrow => borrow.returnedAt === null && borrow.dueAt > new Date()).length;
        const total_overdue = borrows.filter(borrow => borrow.returnedAt === null && borrow.dueAt < new Date()).length;

        return {
            total_borrows,
            total_returns,
            total_active,
            total_overdue,
        };
    }

    async exportBorrows(data: {startDate?: Date, endDate?: Date, overdue: boolean, limit?: number, offset?: number}) {
        const borrows = await prisma.borrow.findMany({
            where: {
                ...(data.startDate && {
                    createdAt: {
                    gte: data.startDate,
                    lte: data.endDate,
                    },
                }),
                ...(data.overdue && {
                    dueAt: {lt: new Date()},
                    returnedAt: null,
                }),
            },
            skip: data.offset,
            take: data.limit,
        });
        return borrows;
    }

}