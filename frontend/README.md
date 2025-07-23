# Loan Application Frontend

## Prerequisites
- Node.js (v18+ recommended)

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

## Running the Frontend

- **Development:**
  ```sh
  npm run dev
  ```
- **Unit Test:**
  ```sh
  npm run test
  ```
- **Build:**
  ```sh
  npm run build
  ```

## Project Structure
- `src/pages/` - Main pages (Loans, LoanView)
- `src/components/` - Reusable components (LoanList, LoanSummaryCards)
- `src/api/loanApi.js` - Loan API calls (Axios)
- `src/router/` - Vue Router setup
- `src/assets/` - Styles and static assets
