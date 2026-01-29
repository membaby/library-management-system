import { Router } from "express";
import { BorrowersController } from "./borrowers.controller";

const router = Router();
const controller = new BorrowersController();


/**
 * @openapi
 * /borrowers:
 *   post:
 *     summary: Create a new borrower
 *     description: Adds a new borrower to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Borrower'
 *     responses:
 *       200:
 *         description: Borrower created successfully
 *       409:
 *         description: Borrower already exists
 */
router.post("/", controller.createBorrower.bind(controller));

/**
 * @openapi
 * /borrowers/{id}:
 *   put:
 *     summary: Update a borrower by ID
 *     description: Updates a borrower's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: number }
 *         required: true
 *         description: ID of the borrower to update
 *     responses:
 *       200:
 *         description: Borrower updated successfully
 *       400:
 *         description: At least one field to update is required
 *       404:
 *         description: Borrower not found
 *       409:
 *         description: Borrower already exists
 */
router.put("/:id", controller.updateBorrower.bind(controller));

/**
 * @openapi
 * /borrowers/{id}:
 *   delete:
 *     summary: Delete a borrower by ID
 *     description: Removes a borrower from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: number }
 *         required: true
 *         description: ID of the borrower to delete
 *     responses:
 *       200:
 *         description: Borrower deleted successfully
 *       404:
 *         description: Borrower not found
 *       409:
 *         description: Borrower has active books borrowed
 */
router.delete("/:id", controller.deleteBorrower.bind(controller));

/**
 * @openapi
 * /borrowers:
 *   get:
 *     summary: List or search borrowers
 *     description: Returns all borrowers, or filters by id/name/email when query params are provided.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *         description: Number of borrowers to return
 *         required: false
 *         default: 10
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *         description: Offset for pagination
 *         required: false
 *         default: 0
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *         description: Partial match (case-insensitive)
 *       - in: query
 *         name: email
 *         schema: { type: string }
 *         description: Partial match (case-insensitive)
 *       - in: query
 *         name: id
 *         schema: { type: string }
 *         description: Exact match
 *     responses:
 *       200:
 *         description: List of borrowers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Borrower'
 */
router.get("/", controller.getBorrowers.bind(controller));

export default router;
