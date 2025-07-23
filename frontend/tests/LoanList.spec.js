import { mount } from '@vue/test-utils'
import LoanList from '../src/components/LoanList.vue'

// Mock the entire LoanApi module so import.meta is never evaluated
jest.mock('../src/api/loanApi', () => ({
  __esModule: true,
  default: {
    getLoans: jest.fn().mockResolvedValue({
      data: [
        { id: '1', applicantName: 'Alice', requestedAmount: 1000, status: 'PENDING', createdAt: new Date().toISOString() },
        { id: '2', applicantName: 'Bob', requestedAmount: 2000, status: 'APPROVED', createdAt: new Date().toISOString() },
      ],
      totalPages: 1,
      total: 2,
    }),
    deleteLoan: jest.fn().mockResolvedValue({}),
  }
}));

const $router = { push: jest.fn() };

describe('LoanList', () => {
  it('renders table and loan rows', async () => {
    const wrapper = mount(LoanList, {
      global: {
        mocks: { $router },
      },
    });
    await new Promise(resolve => setTimeout(resolve));
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.findAll('tbody tr').length).toBe(2);
    expect(wrapper.text()).toContain('Alice');
    expect(wrapper.text()).toContain('Bob');
  });
}); 