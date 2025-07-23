import cors from 'cors';
import express from 'express';
import sequelize from './config/database';
import { Request, Response } from 'express';
import { LoanApplicationsService } from './services/loanApplicationsService';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Loan Applications API',
      version: '1.0.0',
      description: 'API documentation for Loan Applications',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local server' },
    ],
  },
  apis: ['./src/index.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /loans:
 *   get:
 *     summary: Get loan applications
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: PENDING,APPROVED
 *       - in: query
 *         name: applicantName
 *         schema:
 *           type: string
 *       - in: query
 *         name: minAmount
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxAmount
 *         schema:
 *           type: number
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LoanApplication'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     LoanApplication:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         applicantName:
 *           type: string
 *         requestedAmount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
app.get('/loans', async (req: Request, res: Response) => {
  try {
    const filters = {
      status: req.query.status as string,
      applicantName: req.query.applicantName as string,
      minAmount: req.query.minAmount ? Number(req.query.minAmount) : undefined,
      maxAmount: req.query.maxAmount ? Number(req.query.maxAmount) : undefined,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      page: req.query.page ? Number(req.query.page) : undefined,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : undefined,
    };
    const result = await LoanApplicationsService.getAll(filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loan applications', details: error });
  }
});

/**
 * @openapi
 * /loans:
 *   post:
 *     summary: Create loan application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - applicantName
 *               - requestedAmount
 *               - status
 *             properties:
 *               applicantName:
 *                 type: string
 *               requestedAmount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *     responses:
 *       201:
 *         description: Loan application created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoanApplication'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 */
app.post('/loans', async (req: Request, res: Response) => {
  try {
    const { applicantName, requestedAmount, status } = req.body;
    console.log(req.body);
    const loan = await LoanApplicationsService.createLoanApplication({ applicantName, requestedAmount, status });
    res.status(201).json(loan);
  } catch (error: any) {
    console.log(error);
    if (error.message && (
      error.message.includes('required') ||
      error.message.includes('invalid') ||
      error.message.includes('greater than 0') ||
      error.message.includes('must be one of')
    )) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create loan application', details: error });
    }
  }
});

/**
 * @openapi
 * /loans-summary:
 *   get:
 *     summary: Get summary of loan applications by status
 *     responses:
 *       200:
 *         description: Array of status summaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                   numApplicants:
 *                     type: integer
 *                   totalAmount:
 *                     type: number
 *       500:
 *         description: Server error
 */
app.get('/loans-summary', async (req: Request, res: Response) => {
  try {
    const summary = await LoanApplicationsService.getStatusSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch status summary', details: error });
  }
});

/**
 * @openapi
 * /loans/{id}:
 *   get:
 *     summary: Get loan application by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan application found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoanApplication'
 *       404:
 *         description: Loan application not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 */
app.get('/loans/:id', async (req: Request, res: Response) => {
  try {
    const loan = await LoanApplicationsService.getLoanById(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan application not found.' });
    }
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loan application', details: error });
  }
});

/**
 * @openapi
 * /loans/{id}:
 *   put:
 *     summary: Update loan application by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - applicantName
 *               - requestedAmount
 *               - status
 *             properties:
 *               applicantName:
 *                 type: string
 *               requestedAmount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *     responses:
 *       200:
 *         description: Loan application updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoanApplication'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Loan application not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 */
app.put('/loans/:id', async (req: Request, res: Response) => {
  try {
    const { applicantName, requestedAmount, status } = req.body;
    const loan = await LoanApplicationsService.updateLoanApplication(req.params.id, { applicantName, requestedAmount, status });
    res.json(loan);
  } catch (error: any) {
    if (error.message && (
      error.message.includes('required') ||
      error.message.includes('invalid characters') ||
      error.message.includes('Invalid amount') ||
      error.message.includes('Invalid Status')
    )) {
      res.status(400).json({ error: error.message });
    } else if (error.message && error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update loan application', details: error });
    }
  }
});

/**
 * @openapi
 * /loans/{id}:
 *   delete:
 *     summary: Delete loan application by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loan application deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Loan application not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 */
app.delete('/loans/:id', async (req: Request, res: Response) => {
  try {
    const result = await LoanApplicationsService.deleteLoanApplication(req.params.id);
    res.json(result);
  } catch (error: any) {
    if (error.message && error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to delete loan application', details: error });
    }
  }
});

(async () => {
  if (process.env.NODE_ENV !== 'test') {
    try {
      await sequelize.authenticate();
      console.log('Database connected!');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
})(); 