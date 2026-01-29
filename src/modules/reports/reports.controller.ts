import { Request, Response } from "express";
import { ReportsService } from "./reports.service";
import { analyzeBorrowsQuerySchema, exportBorrowsQuerySchema } from "./reports.schemas";
import { paginationQuerySchema } from "../common/common.schemas";
import { format } from "fast-csv";

const service = new ReportsService();

export class ReportsController {

    async analyzeBorrows(req: Request, res: Response) {
        const { startDate, endDate } = analyzeBorrowsQuerySchema.parse(req.query);
        const analysis = await service.analyzeBorrows({ startDate, endDate });
        res.status(200).json({
            status: "success",
            analysis: analysis
        });
    }

    async getOverdueBorrows(req: Request, res: Response) {
        const { limit, offset } = paginationQuerySchema.parse(req.query);
        const { startDate, endDate } = exportBorrowsQuerySchema.parse(req.query);
        const overdueBorrows = await service.exportBorrows({ startDate, endDate, overdue: true, limit, offset });
        res.status(200).json({
            status: "success",
            overdueBorrows: overdueBorrows
        });
    }

    async exportBorrows(req: Request, res: Response) {
        const { startDate, endDate, overdue } = exportBorrowsQuerySchema.parse(req.query);
        const borrows = await service.exportBorrows({ startDate, endDate, overdue });
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=borrows.csv");
        const csv = format({ headers: true });
        csv.pipe(res);
        borrows.forEach(borrow => {
            csv.write({
                id: borrow.id,
                bookId: borrow.bookId,
                borrowerId: borrow.borrowerId,
                borrowedAt: borrow.borrowedAt,
                dueAt: borrow.dueAt,
                returnedAt: borrow.returnedAt,
                createdAt: borrow.createdAt,
            });
        });
        csv.end();
    }

}