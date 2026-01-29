import { Request, Response } from "express";
import { BorrowsService } from "./borrows.service";
import { createBorrowsSchema, getBorrowsQuerySchema } from "./borrows.schemas";
import { idParamSchema, paginationQuerySchema } from "../common/common.schemas";

const service = new BorrowsService();

export class BorrowsController {

    async checkoutBook(req: Request, res: Response) {
        const { bookId, borrowerId, dueAt } = createBorrowsSchema.parse(req.body);
        await service.checkoutBook({ bookId, borrowerId, dueAt });
        res.status(200).json({
            status: "success",
            message: "Book checked out successfully"
        });
    }

    async returnBook(req: Request, res: Response) {
        const { id } = idParamSchema.parse(req.params);
        await service.returnBook({ id });
        res.status(200).json({
            status: "success",
            message: "Book returned successfully"
        });
    }

    async getBorrows(req: Request, res: Response) {
        const { limit, offset } = paginationQuerySchema.parse(req.query);
        const { borrowerId, bookId, dueAt, active, overdue } = getBorrowsQuerySchema.parse(req.query);
        const borrows = await service.getBorrows(limit, offset, borrowerId, bookId, dueAt, active, overdue);
        res.status(200).json({
            status: "success",
            borrows: borrows
        });
    }
}