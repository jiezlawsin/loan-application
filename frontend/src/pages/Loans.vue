<template>
  <div class="container py-4">
    <h1 class="mb-4">Loan Applications</h1>
    <LoanSummaryCards />
    <div class="mt-5">
      <LoanList />
    </div>
  </div>
</template>

<script setup>
import LoanSummaryCards from '../components/LoanSummaryCards.vue';
import LoanList from '../components/LoanList.vue';
</script> 