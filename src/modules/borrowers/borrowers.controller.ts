import { Request, Response } from "express";
import { BorrowersService } from "./borrowers.service";
import { createBorrowerSchema, updateBorrowerSchema, idParamSchema } from "./borrowers.schemas";


const service = new BorrowersService();

export class BorrowersController {

    async createBorrower(req: Request, res: Response) {
        const { name, email } = createBorrowerSchema.parse(req.body);
        await service.createBorrower({ name, email });
        res.status(200).json({
            status: "success",
            message: "Borrower created successfully"
        });
    }

    async updateBorrower(req: Request, res: Response) {
        const { id } = idParamSchema.parse(req.params);
        const { name, email } = updateBorrowerSchema.parse(req.body);
        await service.updateBorrower({ id, name, email });
        res.status(200).json({
            status: "success",
            message: "Borrower updated successfully"
        })
    }

    async deleteBorrower(req: Request, res: Response) {
        const { id } = idParamSchema.parse(req.params);
        await service.deleteBorrower(id);
        res.status(200).json({
            status: "success",
            message: "Borrower deleted successfully"
        });
    }

    async getBorrowers(req: Request, res: Response) {
        const limit = Number(req.query.limit) || 10;
        const offset = Number(req.query.offset) || 0;
        const name = req.query.name as string;
        const email = req.query.email as string;
        const result = idParamSchema.safeParse(req.query);
        let id: number | undefined;
        if (result.success) {
            id = result.data.id;
        }
        const borrowers = await service.getBorrowers(limit, offset, id, name, email);
        res.status(200).json({
            status: "success",
            borrowers: borrowers
        });
    }

}