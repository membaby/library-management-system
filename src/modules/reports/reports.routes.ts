import { Router } from "express";
import { ReportsController } from "./reports.controller";

const router = Router();
const controller = new ReportsController();

/**
 * @openapi
 * /reports/borrows/summary:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Summary of borrows
 *     description: Summary of borrows from the library.
 *     responses:
 *       200:
 *         description: Borrows summarized successfully
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: date }
 *         required: true
 *         description: Start date of the analysis
 *       - in: query
 *         name: endDate
 *         schema: { type: date }
 *         required: true
 *         description: End date of the analysis
 */
router.get("/borrows/analysis", controller.analyzeBorrows.bind(controller));

/**
 * @openapi
 * /reports/borrows/overdue:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Get overdue borrows
 *     description: Gets overdue borrows from the library.
 *     responses:
 *       200:
 *         description: Overdue borrows retrieved successfully
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: number }
 *         required: true
 *         description: Limit of the overdue borrows
 *       - in: query
 *         name: offset
 *         schema: { type: number }
 *         required: true
 *         description: Offset of the overdue borrows
 */
router.get("/borrows/overdue", controller.getOverdueBorrows.bind(controller));

/**
 * @openapi
 * /reports/borrows/export:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Export borrows
 *     description: Exports borrows from the library.
 *     responses:
 *       200:
 *         description: Borrows exported successfully
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: date }
 *         required: true
 *         description: Start date of the export
 *       - in: query
 *         name: endDate
 *         schema: { type: date }
 *         required: true
 *         description: End date of the export
 *       - in: query
 *         name: overdue
 *         schema: { type: boolean }
 *         required: true
 *         description: Whether to export overdue borrows only
 *       - in: query
 *         name: limit
 *         schema: { type: number }
 *         required: true
 *         description: Limit of the export
 *       - in: query
 *         name: offset
 *         schema: { type: number }
 *         required: true
 *         description: Offset of the export
 */
router.get("/borrows/export", controller.exportBorrows.bind(controller));

export default router;
