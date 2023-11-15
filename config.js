require('dotenv').config()

var config = {
    server: process.env.DB_SERVER, // eg:: 'DESKTOP_mjsi\\MSSQLEXPRESS'
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,      // please read above note
    password: process.env.DB_PASS,   // please read above note
    options: {
        trustedconnection: true,
        enableArithAort: true,
        instancename: 'WIN-RVBJS380SPR\MSSQLSERVER1',
        trustServerCertificate: true
    },
    port: 1433
}

console.log(process.env.DB_SERVER)

module.exports = config      
