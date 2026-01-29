/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       example:
 *         title: "Dive Into Design Patterns"
 *         author: "Alexander Shvets"
 *         isbn: "9798900706498"
 *         shelfLocation: "A1-B2"
 *         availableQuantity: 3
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         isbn:
 *           type: string
 *         shelfLocation:
 *           type: string
 *           nullable: true
 *         availableQuantity:
 *           type: integer
 * 
 *     Borrower:
 *       type: object
 *       example:
 *         name: "Mahmoud Embaby"
 *         email: "mah.embaby@outlook.com"
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 * 
 *     CreateBorrow:
 *       type: object
 *       example:
 *         bookId: 1
 *         borrowerId: 1
 *         dueAt: "2026-01-29T10:00:00.000Z"
 *       properties:
 *         bookId:
 *           type: integer
 *         borrowerId:
 *           type: integer
 *         dueAt:
 *           type: string
 *           format: date-time
 * 
 */
export {};
