import { mount } from '@vue/test-utils'
import LoanView from '../src/pages/LoanView.vue'

jest.mock('../src/api/loanApi', () => ({
  __esModule: true,
  default: {
    getLoan: jest.fn().mockResolvedValue({
      id: '1', applicantName: 'Alice', requestedAmount: 1000, status: 'PENDING', createdAt: new Date().toISOString()
    }),
    updateLoan: jest.fn().mockResolvedValue({}),
  }
}));

const $route = { params: { id: '1' } };
const $router = { push: jest.fn() };

describe('LoanView', () => {
  it('renders form with loan data and shows modal on save', async () => {
    const wrapper = mount(LoanView, {
      global: {
        mocks: { $route, $router },
      },
    });
    await new Promise(resolve => setTimeout(resolve));
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input.form-control').element.value).toBe('Alice');
    await wrapper.find('form').trigger('submit.prevent');
    await new Promise(resolve => setTimeout(resolve));
    expect(wrapper.find('.modal.show').exists()).toBe(true);
    expect(wrapper.text()).toContain('Loan updated!');
  });
}); 