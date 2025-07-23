<template>
  <div class="row g-3">
    <div v-for="status in statuses" :key="status" class="col-md-4">
      <div class="card text-center">
        <div class="card-header fw-bold text-uppercase">{{ status }}</div>
        <div class="card-body">
          <h5 class="card-title">Applicants: {{ summaryMap[status]?.totalApplicants ?? 0 }}</h5>
          <p class="card-text">Total Amount: <span class="fw-bold">${{ (summaryMap[status]?.totalAmount ?? 0).toLocaleString() }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoanApi from '../api/loanApi';

export default {
  data() {
    return {
      summaries: [],
      statuses: ['PENDING', 'APPROVED', 'REJECTED'],
    };
  },
  computed: {
    summaryMap() {
      const map = {};
      for (const s of this.summaries) {
        map[s.status] = s;
      }
      return map;
    },
  },
  methods: {
    async fetchSummary() {
      try {
        this.summaries = await LoanApi.getLoanSummaries();
        console.log('summary', this.summaries);
      } catch (e) {
        this.summaries = [];
      }
    },
  },
  mounted() {
    this.fetchSummary();
  },
};
</script> 