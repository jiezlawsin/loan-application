import { createRouter, createWebHistory } from 'vue-router';
import Loans from '../pages/Loans.vue';
import LoanView from '../pages/LoanView.vue';

const routes = [
  { path: '/', name: 'Loans', component: Loans },
  { path: '/loan/:id', name: 'LoanView', component: LoanView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 