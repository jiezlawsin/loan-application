<template>
  <div class="container py-4">
    <h2>Loan Application Details</h2>
    <div v-if="loading" class="d-flex justify-content-center my-4">
      <div class="spinner-border text-primary" role="status">
      </div>
    </div>
    <form v-else-if="loan" @submit.prevent="saveLoan" class="mt-4">
      <div class="mb-3">
        <label class="form-label">Applicant Name</label>
        <input v-model="loan.applicantName" class="form-control" required pattern="[a-zA-Z\s\-']+" />
      </div>
      <div class="mb-3">
        <label class="form-label">Requested Amount</label>
        <input v-model.number="loan.requestedAmount" type="number" min="1" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Status</label>
        <select v-model="loan.status" class="form-select" required>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </div>
      <button type="submit" class="btn btn-success">Save</button>
      <button type="button" class="btn btn-secondary ms-2" @click="goBack">Back</button>
    </form>
    <div v-else class="alert alert-info mt-4">Not found.</div>

    <!-- Success Modal -->
    <div class="modal fade" tabindex="-1" :class="{ show: showSuccessModal }" style="display: block;" v-if="showSuccessModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Success</h5>
            <button type="button" class="btn-close" @click="closeSuccessModal"></button>
          </div>
          <div class="modal-body">
            <p>Loan updated!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeSuccessModal">OK</button>
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
      loan: null,
      loading: false,
      showSuccessModal: false,
    };
  },
  methods: {
    async fetchLoan() {
      this.loading = true;
      try {
        this.loan = await LoanApi.getLoan(this.$route.params.id);
        console.log('loan', this.loan);
      } finally {
        this.loading = false;
      }
    },
    async saveLoan() {
      await LoanApi.updateLoan(this.$route.params.id, this.loan);
      console.log('loan updated');
      this.showSuccessModal = true;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push('/');
    },
    goBack() {
      this.$router.push('/');
    },
  },
  mounted() {
    this.fetchLoan();
  },
};
</script> 