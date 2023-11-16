// const cron = require('cron');
// const config = require('../config');
// const sql = require('mssql');

// const checkRentalAvailability = async () => {
//     const currentDate = new Date();
//     const pool = sql.connect(config)
//     const request = pool.request();
//     console.log('query executed successfully')
//     try {
//       await request.query`
//         UPDATE vehicles SET vehicle_availability = 1
//         WHERE vehicle_id IN (
//           SELECT r.vehicle_id
//           FROM Rentals r
//           WHERE r.end_date < ${currentDate}
//         )
//       `;
//       console.log('query executed successfully')
//     } catch (error) {
//       console.error('Error executing SQL query:', error.message);
//     }
//   };
  
//   const cronJob = new cron.CronJob('13 55 0 * * *', checkRentalAvailability);
//   cronJob.start();

//   console.log("hi")

//   module.exports = {checkRentalAvailability}