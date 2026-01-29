import { Router } from "express";
import { BorrowsController } from "./borrows.controller";

const router = Router();
const controller = new BorrowsController();

/**
 * @openapi
 * /borrows:
 *   post:
 *     tags:
 *       - Borrows
 *     summary: Checkout a book
 *     description: Checks out a book to a borrower.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBorrow'
 *     responses:
 *       200:
 *         description: Book checked out successfully
 *       409:
 *         description: Book is not available
 */
router.post("/", controller.checkoutBook.bind(controller));

/**
 * @openapi
 * /borrows/{id}/return:
 *   put:
 *     tags:
 *       - Borrows
 *     summary: Return a book
 *     description: Returns a book to the library.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: number }
 *         required: true
 *         description: ID of the borrow to return
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Borrow not found
 */
router.put("/:id/return", controller.returnBook.bind(controller));

/**
 * @openapi
 * /borrows:
 *   get:
 *     tags:
 *       - Borrows
 *     summary: Get all borrows
 *     description: Gets all borrows from the library.
 *     responses:
 *       200:
 *         description: Borrows retrieved successfully
 *       400:
 *         description: Invalid request
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: number }
 *         required: false
 *         description: Number of borrows to return
 *       - in: query
 *         name: offset
 *         schema: { type: number }
 *         required: false
 *         description: Offset for pagination
 *       - in: query
 *         name: borrowerId
 *         schema: { type: number }
 *         required: false
 *         description: ID of the borrower
 *       - in: query
 *         name: bookId
 *         schema: { type: number }
 *         required: false
 *         description: ID of the book
 *       - in: query
 *         name: dueAt
 *         schema: { type: string }
 *         required: false
 *         description: Due date of the borrow
 *       - in: query
 *         name: active
 *         schema: { type: boolean }
 *         required: false
 *         description: Whether the borrow is active
 *       - in: query
 *         name: overdue
 *         schema: { type: boolean }
 *         required: false
 *         description: Whether the borrow is overdue
 */
router.get("/", controller.getBorrows.bind(controller));

export default router;
