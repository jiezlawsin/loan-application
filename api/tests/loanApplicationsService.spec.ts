import { LoanApplicationsService } from '../src/services/loanApplicationsService';

const mockLoanData = [
  { id: '1', applicantName: 'Alice', requestedAmount: 1000, status: 'PENDING', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', applicantName: 'Bob', requestedAmount: 2000, status: 'APPROVED', createdAt: new Date(), updatedAt: new Date() },
];

const MockModel = {
  findAndCountAll: jest.fn().mockResolvedValue({ rows: mockLoanData, count: 2 }),
  create: jest.fn().mockResolvedValue(mockLoanData[0]),
  findByPk: jest.fn().mockImplementation((id: string) => {
    if (id === '1') return Promise.resolve({
      ...mockLoanData[0],
      save: jest.fn().mockResolvedValue(mockLoanData[0]),
      destroy: jest.fn().mockResolvedValue({})
    });
    return Promise.resolve(null);
  })
};
LoanApplicationsService.LoanModel = MockModel as any;

describe('LoanApplicationsService', () => {
  it('should return all loans with getAll', async () => {
    const result = await LoanApplicationsService.getAll({});
    expect(result.data.length).toBe(2);
    expect(result.data[0].applicantName).toBe('Alice');
    expect(result.data[1].status).toBe('APPROVED');
  });

  it('should create a loan with createLoanApplication', async () => {
    const result = await LoanApplicationsService.createLoanApplication({ applicantName: 'Alice', requestedAmount: 1000, status: 'PENDING' });
    expect(MockModel.create).toHaveBeenCalledWith({ applicantName: 'Alice', requestedAmount: 1000, status: 'PENDING' });
    expect(result.applicantName).toBe('Alice');
  });

  it('should update a loan with updateLoanApplication', async () => {
    const result = await LoanApplicationsService.updateLoanApplication('1', { applicantName: 'Alice', requestedAmount: 1000, status: 'APPROVED' });
    expect(result.applicantName).toBe('Alice');
    expect(result.status).toBe('APPROVED');
  });

  it('should delete a loan with deleteLoanApplication', async () => {
    const result = await LoanApplicationsService.deleteLoanApplication('1');
    expect(result).toEqual({ message: 'Loan application deleted.' });
  });
}); 