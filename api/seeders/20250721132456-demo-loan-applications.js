'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('loan_applications', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Alice Smith',
        requestedAmount: 5000.00,
        status: 'PENDING',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Bob Johnson',
        requestedAmount: 12000.50,
        status: 'APPROVED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Carol Lee',
        requestedAmount: 800.75,
        status: 'REJECTED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'David Kim',
        requestedAmount: 2500.00,
        status: 'PENDING',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Eva Brown',
        requestedAmount: 15000.00,
        status: 'APPROVED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Frank Green',
        requestedAmount: 3200.00,
        status: 'PENDING',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Grace Hall',
        requestedAmount: 7000.00,
        status: 'REJECTED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Henry Adams',
        requestedAmount: 9000.00,
        status: 'APPROVED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Ivy Clark',
        requestedAmount: 1100.00,
        status: 'PENDING',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Jack White',
        requestedAmount: 4500.00,
        status: 'APPROVED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Kathy Black',
        requestedAmount: 6000.00,
        status: 'REJECTED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Leo Young',
        requestedAmount: 2000.00,
        status: 'PENDING',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Mona King',
        requestedAmount: 10000.00,
        status: 'APPROVED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Nate Scott',
        requestedAmount: 3500.00,
        status: 'REJECTED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Olivia Turner',
        requestedAmount: 8000.00,
        status: 'PENDING',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Paul Walker',
        requestedAmount: 2200.00,
        status: 'APPROVED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Quinn Evans',
        requestedAmount: 9500.00,
        status: 'REJECTED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Rachel Harris',
        requestedAmount: 4000.00,
        status: 'PENDING',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Sam Lewis',
        requestedAmount: 3000.00,
        status: 'APPROVED',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        applicantName: 'Tina Martin',
        requestedAmount: 1700.00,
        status: 'REJECTED',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('loan_applications', null, {});
  }
};
