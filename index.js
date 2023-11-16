const express = require('express')
const app = express()
const sql = require('mssql')
const config = require('./config')
const port = 3000
require('dotenv').config()
const cron = require('cron');


app.use(express.json())

sql.connect(config, function (err) {

    if (err) console.log(err);
    else {
        console.log('Connected to SQL Server');
    }

});

const mainRoute = require('./route')
app.use('/api', mainRoute)

const checkRentalAvailability = async () => {
    const currentDate = new Date();
    const pool = sql.connect(config)
    const request = pool.request();
    console.log('query executed successfully')
    try {
      await request.query`
        UPDATE vehicles SET vehicle_availability = 1
        WHERE vehicle_id IN (
          SELECT r.vehicle_id
          FROM Rentals r
          WHERE r.end_date < ${currentDate}
        )
      `;
      console.log('query executed successfully')
    } catch (error) {
      console.error('Error executing SQL query:', error.message);
    }
  };
  
  const cronJob = new cron.CronJob('14 49 0 * * *', checkRentalAvailability);
  cronJob.start();


app.listen(port, (error) => {
    if (!error) {
        console.log(`server is listening on port ${port}`)
    }
})