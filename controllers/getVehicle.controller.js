const express = require('express')
const router = express.Router()
const config = require('../config')
const sql = require('mssql')

// API for fetching the all unique wheels count
router.get('/noWheels', async (req, res) => {

    try {

        const pool = await sql.connect(config);
        let noWheels = await pool.request()
            .query(`select type_wheelcount from VehicleTypes group by type_wheelcount`)

        if (noWheels.rowsAffected[0] === 0) {
            res.status(400).send({ error: true, message: "Data not found" })
            return
        }

        res.status(200).send({ error: false, data: noWheels.recordset })
        return
    }
    catch (error) {
        res.status(500).send({ error: true, message: error.message })
        return
    }

})

//API for fetching all the type of vehicle based on the number of wheels selected
router.get('/vehicleType', async (req, res) => {
    try {
        let { type_wheelcount } = req.body
        const pool = await sql.connect(config)
        

        if (type_wheelcount === null || type_wheelcount === undefined) {
            res.status(400).send({ error: true, message: "Number of wheels is required" })
            return
        }

        if (typeof type_wheelcount !== "number") {
            res.status(400).send({ error: true, message: "please provide integer number" })
            return
        }


        let VehicleTypes = await pool.request()
            .query(`select * from VehicleTypes where type_wheelcount = ${type_wheelcount}`)

        if (VehicleTypes.rowsAffected[0] === 0) {
            res.status(404).send({ error: true, message: "Vehicle type not found" })
            return
        }

        res.status(200).send({ error: false, data: VehicleTypes.recordset })
        return
    }
    catch (error) {
        res.status(500).send({ error: true, message: error.message })
        return
    }
})

//API for fetching all the vehicle modles based on the type of vehicle selected
router.get('/vehicleModel', async (req, res) => {
    try {
        let { type_id } = req.body
        const pool = await sql.connect(config)

        if (type_id === null || type_id === undefined) {
            res.status(400).send({ error: true, message: "Vehicle type is required" })
            return
        }

        if (typeof type_id !== "number") {
            res.status(400).send({ error: true, message: "please provide integer number" })
            return
        }


        // Here we are fetching all the available vehicles only. if its already Booked i am not fetching those vehicle modesl.
        let vehicleModel = await pool.request()
            .query(`
                    SELECT * FROM Vehicles WHERE vehicle_type_id = ${type_id} and vehicle_availability = 1              
               `)                                                                                      

        if (vehicleModel.rowsAffected[0] === 0) {
            res.status(404).send({ error: true, message: "No vehicle is available at this moment" })
            return
        }

        res.status(200).send({ error: false, data: vehicleModel.recordset })
        return



    }
    catch (error) {
        res.status(500).send({ error: true, message: error.message })
        return
    }
})


module.exports = router