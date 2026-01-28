"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = require("./books.controller");
const router = (0, express_1.Router)();
const controller = new books_controller_1.BooksController();
/**
 * @openapi
 * /books:
 *   post:
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
 * /books/{isbn}:
 *   put:
 *     summary: Update a book by ISBN
 *     description: Updates a book's details.
 *     parameters:
 *       - in: path
 *         name: isbn
 *         schema: { type: string }
 *         required: true
 *         description: ISBN of the book to update
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       409:
 *         description: Book already exists
 */
router.put("/:isbn", controller.updateBook.bind(controller));
/**
 * @openapi
 * /books/{isbn}:
 *   delete:
 *     summary: Delete a book by ISBN
 *     description: Removes a book from the system.
 *     parameters:
 *       - in: path
 *         name: isbn
 *         schema: { type: string }
 *         required: true
 *         description: ISBN of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete("/:isbn", controller.deleteBook.bind(controller));
/**
 * @openapi
 * /books:
 *   get:
 *     summary: List or search books
 *     description: Returns all books, or filters by title/author/isbn when query params are provided.
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
exports.default = router;
//# sourceMappingURL=books.routes.js.map