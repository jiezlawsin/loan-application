<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h2 class="h5">Loan Applications</h2>
    </div>
    <div v-if="loading" class="d-flex justify-content-center my-4">
      <div class="spinner-border text-primary" role="status">
      </div>
    </div>
    <table v-else class="table table-bordered table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in loans" :key="loan.id">
          <td>{{ loan.applicantName }}</td>
          <td>${{ loan.requestedAmount.toLocaleString() }}</td>
          <td>{{ loan.status }}</td>
          <td>{{ new Date(loan.createdAt).toLocaleString() }}</td>
          <td>
            <button class="btn btn-sm btn-primary me-2" @click="viewLoan(loan.id)">View</button>
            <button class="btn btn-sm btn-danger" @click="openDeleteModal(loan)">Delete</button>
          </td>
        </tr>
        <tr v-if="loans.length === 0">
          <td colspan="5" class="text-center">No loans found.</td>
        </tr>
      </tbody>
    </table>
    <nav v-if="!loading && totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button class="page-link" @click="changePage(page - 1)" :disabled="page === 1">Previous</button>
        </li>
        <li class="page-item" v-for="p in totalPages" :key="p" :class="{ active: p === page }">
          <button class="page-link" @click="changePage(p)">{{ p }}</button>
        </li>
        <li class="page-item" :class="{ disabled: page === totalPages }">
          <button class="page-link" @click="changePage(page + 1)" :disabled="page === totalPages">Next</button>
        </li>
      </ul>
    </nav>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" tabindex="-1" :class="{ show: showDeleteModal }" style="display: block;" v-if="showDeleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the loan application for <strong>{{ loanToDelete?.applicantName }}</strong>?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>

<script>
import LoanApi from '../api/loanApi';

export default {
  data() {
    return {
      loans: [],
      page: 1,
      pageSize: 10,
      totalPages: 1,
      total: 0,
      loading: false,
      showDeleteModal: false,
      loanToDelete: null,
    };
  },
  methods: {
    async fetchLoans() {
      this.loading = true;
      try {
        const data = await LoanApi.getLoans(this.page, this.pageSize);
        console.log('loans', data);
        this.loans = data.data;
        this.totalPages = data.totalPages;
        this.total = data.total;
      } catch (e) {
        this.loans = [];
        this.totalPages = 1;
        this.total = 0;
      } finally {
        this.loading = false;
      }
    },
    changePage(p) {
      if (p >= 1 && p <= this.totalPages) {
        this.page = p;
        this.fetchLoans();
      }
    },
    viewLoan(id) {
      this.$router.push({ name: 'LoanView', params: { id } });
    },
    openDeleteModal(loan) {
      this.loanToDelete = loan;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.loanToDelete = null;
    },
    async confirmDelete() {
      if (!this.loanToDelete) return;
      await LoanApi.deleteLoan(this.loanToDelete.id);
      this.closeDeleteModal();
      this.fetchLoans();
    },
  },
  mounted() {
    this.fetchLoans();
  },
};
</script> 