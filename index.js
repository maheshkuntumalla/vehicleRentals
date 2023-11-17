const express = require('express')
const app = express()
const sql = require('mssql')
const config = require('./config')
const port = 3000
require('dotenv').config()


app.use(express.json())

// During Dockerization DB connection will take some time to connect, thats why i am trying reconnect Node with DB for every 5 seconds
function connectWithRetry(){
    return sql.connect(config,(err) => {
 
         if (err) {
             console.log(`Connection to DB failed, retry in 5s `,err.message)
             sql.close()
             setTimeout(connectWithRetry, 5000);
         }
         else {
             console.log('Connected to SQL Server successfully');
         }
     }); 
 }

 connectWithRetry()

const mainRoute = require('./route')
app.use('/api', mainRoute)


app.listen(port, (error) => {
    if (!error) {
        console.log(`server is listening on port ${port}`)
    }
})