const express = require('express')
const app = express()
const sql = require('mssql')
const config = require('./config')
const port = 3000
require('dotenv').config()

app.use(express.json())

sql.connect(config, function (err) {

    if (err) console.log(err);
    else {
        console.log('Connected to SQL Server');
    }

});

const mainRoute = require('./route')
app.use('/api', mainRoute)


app.listen(port, (error) => {
    if (!error) {
        console.log(`server is listening on port ${port}`)
    }
})