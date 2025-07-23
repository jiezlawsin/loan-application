import { Op, QueryTypes } from 'sequelize';
import LoanApplication, { LoanStatus } from '../models/loanApplication';
import sequelize from '../config/database';

export interface LoanApplicationFilters {
  status?: string;
  applicantName?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export class LoanApplicationsService {
  static LoanModel = LoanApplication;

  static async getAll(filters: LoanApplicationFilters) {
    const where: any = {};

    if (filters.status) {
      where.status = { [Op.in]: filters.status.split(',') };
    }
    if (filters.applicantName) {
      where.applicantName = { [Op.iLike]: `${filters.applicantName}%` };
    }
    if (filters.minAmount !== undefined) {
      where.requestedAmount = { ...(where.requestedAmount || {}), [Op.gte]: filters.minAmount };
    }
    if (filters.maxAmount !== undefined) {
      where.requestedAmount = { ...(where.requestedAmount || {}), [Op.lte]: filters.maxAmount };
    }
    if (filters.startDate) {
      where.createdAt = { ...(where.createdAt || {}), [Op.gte]: new Date(filters.startDate) };
    }
    if (filters.endDate) {
      where.createdAt = { ...(where.createdAt || {}), [Op.lte]: new Date(filters.endDate) };
    }

    // Pagination
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const pageSize = filters.pageSize && filters.pageSize > 0 ? filters.pageSize : 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const { rows, count } = await this.LoanModel.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  }

  static async getStatusSummary() {
    const results = await sequelize.query(
      `SELECT status, COUNT(id) AS "totalApplicants", SUM("requestedAmount") AS "totalAmount"
       FROM loan_applications
       GROUP BY status
       ORDER BY status ASC`,
      { type: QueryTypes.SELECT }
    );
    return (results as any[]).map(row => ({
      status: row.status,
      totalApplicants: Number(row.totalApplicants),
      totalAmount: Number(row.totalAmount),
    }));
  }

  static async createLoanApplication({ applicantName, requestedAmount, status }: { applicantName: string; requestedAmount: number; status: string }) {
    if (!applicantName || typeof applicantName !== 'string' || !applicantName.trim()) {
      throw new Error('Applicant name is required.');
    }
    const trimmedName = applicantName.trim();
    if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
      throw new Error('Applicant name contains invalid characters.');
    }

    if (typeof requestedAmount !== 'number' || isNaN(requestedAmount) || requestedAmount <= 0) {
      throw new Error('Invalid amount.');
    }

    const allowedStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid Status.');
    }

    return this.LoanModel.create({
      applicantName: trimmedName,
      requestedAmount,
      status,
    });
  }

  static async updateLoanApplication(id: string, { applicantName, requestedAmount, status }: { applicantName: string; requestedAmount: number; status: string }) {
    if (!applicantName || typeof applicantName !== 'string' || !applicantName.trim()) {
      throw new Error('Applicant name is required.');
    }
    const trimmedName = applicantName.trim();
    if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
      throw new Error('Applicant name contains invalid characters.');
    }
    if (typeof requestedAmount !== 'number' || isNaN(requestedAmount) || requestedAmount <= 0) {
      throw new Error('Invalid amount.');
    }
    const allowedStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
    if (!allowedStatuses.includes(status)) {
      throw new Error('Invalid Status.');
    }

    const loan = await this.LoanModel.findByPk(id);
    if (!loan) {
      throw new Error('Loan application not found.');
    }
    loan.applicantName = trimmedName;
    loan.requestedAmount = requestedAmount;
    loan.status = status as LoanStatus;
    await loan.save();
    return loan;
  }

  static async deleteLoanApplication(id: string) {
    const loan = await this.LoanModel.findByPk(id);
    if (!loan) {
      throw new Error('Loan application not found.');
    }
    await loan.destroy();
    return { message: 'Loan application deleted.' };
  }

  static async getLoanById(id: string) {
    return this.LoanModel.findByPk(id);
  }
} 