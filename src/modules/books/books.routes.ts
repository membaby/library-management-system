import { Router } from "express";
import { BooksController } from "./books.controller";

const router = Router();
const controller = new BooksController();


/**
 * @openapi
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     description: Adds a new book to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book created successfully
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: Book already exists
 */
router.post("/", controller.createBook.bind(controller));

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Update a book by ID
 *     description: Updates a book's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: ID of the book to update
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       409:
 *         description: Book already exists
 */
router.put("/:id", controller.updateBook.bind(controller));

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book by ID
 *     description: Removes a book from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete("/:id", controller.deleteBook.bind(controller));

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: List or search books
 *     description: Returns all books, or filters by id/title/author/isbn when query params are provided.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *         description: Number of books to return
 *         required: false
 *         default: 10
 *       - in: query
 *         name: offset
 *         schema: { type: integer }
 *         description: Offset for pagination
 *         required: false
 *         default: 0
 *       - in: query
 *         name: id
 *         schema: { type: integer }
 *         description: Exact match
 *       - in: query
 *         name: title
 *         schema: { type: string }
 *         description: Partial match (case-insensitive)
 *       - in: query
 *         name: author
 *         schema: { type: string }
 *         description: Partial match (case-insensitive)
 *       - in: query
 *         name: isbn
 *         schema: { type: string }
 *         description: Exact match
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", controller.getBooks.bind(controller));

export default router;
