import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

class LoanApi {
  static async getLoanSummaries() {
    const res = await api.get('/loans-summary');
    return res.data;
  }

  static async getLoans(page = 1, pageSize = 10) {
    const res = await api.get(`/loans?page=${page}&pageSize=${pageSize}`);
    return res.data;
  }

  static async deleteLoan(id) {
    return api.delete(`/loans/${id}`);
  }

  static async getLoan(id) {
    const res = await api.get(`/loans/${id}`);
    return res.data;
  }

  static async updateLoan(id, data) {
    return api.put(`/loans/${id}`, data);
  }

  static async createLoan(data) {
    return api.post('/loans', data);
  }
}

export default LoanApi; 