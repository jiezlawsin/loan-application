import { mount } from '@vue/test-utils'
import LoanSummaryCards from '../src/components/LoanSummaryCards.vue'

jest.mock('../src/api/loanApi', () => ({
  __esModule: true,
  default: {
    getLoanSummaries: jest.fn().mockResolvedValue([
      { status: 'PENDING', totalApplicants: 2, totalAmount: 1000 },
      { status: 'APPROVED', totalApplicants: 1, totalAmount: 2000 },
      { status: 'REJECTED', totalApplicants: 0, totalAmount: 3000 },
    ]),
  }
}));

describe('LoanSummaryCards', () => {
  it('renders all three status cards with correct values', async () => {
    const wrapper = mount(LoanSummaryCards);
    await new Promise(resolve => setTimeout(resolve));
    const cards = wrapper.findAll('.card');
    expect(cards.length).toBe(3);
    expect(wrapper.text()).toContain('PENDING');
    expect(wrapper.text()).toContain('APPROVED');
    expect(wrapper.text()).toContain('REJECTED');
    expect(wrapper.text()).toContain('Applicants: 2');
    expect(wrapper.text()).toContain('Applicants: 1');
    expect(wrapper.text()).toContain('Applicants: 0');
  });
}); 