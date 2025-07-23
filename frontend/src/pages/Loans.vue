<template>
  <div class="container py-4">
    <h1 class="mb-4">Loan Dashboard</h1>
    <LoanSummaryCards ref="summaryCards" />
    <div class="mt-5">
      <LoanList @refresh-summary="refreshSummary" />
    </div>
  </div>
</template>

<script>
import LoanSummaryCards from '../components/LoanSummaryCards.vue';
import LoanList from '../components/LoanList.vue';

export default {
  components: { LoanSummaryCards, LoanList },
  methods: {
    refreshSummary() {
      this.$refs.summaryCards.fetchSummary();
    },
  },
};
</script> 