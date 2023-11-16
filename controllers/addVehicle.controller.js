const express = require('express')
const router = express.Router()
const config = require('../config')
const sql = require('mssql')

// API for adding new vehicle model into the database
router.post('/vehicleModel', async (req, res) => {

    try {
        let { type_id, model } = req.body
        const pool = await sql.connect(config)

        if (type_id === null || type_id === undefined) {
            res.status(400).send({ error: true, message: "Vehicle type is required" })
            return
        }

        if (model === null || model === undefined || model.trim() === '') {
            res.status(400).send({ error: true, message: "Model is required" })
            return
        }


        if (typeof type_id !== "number") {
            res.status(400).send({ error: true, message: "please provide integer number" })
            return
        }

        if (typeof model !== "string") {
            res.status(400).send({ error: true, message: "please provide string type" })
            return
        }

        var addModel = pool.request()
            .input('type_id', sql.Int, type_id)
            .input('model', sql.NVarChar, model)
            .query(`
                INSERT INTO Vehicles (vehicle_type_id, vehicle_model)
                values (@type_id, @model)
            `)


        res.status(200).send({ error: false, message: 'Model added successfully!' })
        return


    }
    catch (error) {
        res.status(500).send({ error: true, message: error.message })
        return
    }

})

// API for vehicle Booking
router.post('/vehicleBooking', async (req, res) => {

    let { user_first, user_last, vehicle_id, start_date, end_date } = req.body
    const pool = await sql.connect(config)

    if (user_first === null || user_first === undefined, user_first.trim() === "") {
        res.status(400).send({ error: true, message: "User first name is required" })
        return
    }

    if (user_last === null || user_last === undefined, user_last.trim() === "") {
        res.status(400).send({ error: true, message: "User first name is required" })
        return
    }

    if (vehicle_id === null || vehicle_id === undefined) {
        res.status(400).send({ error: true, message: "vehicle model is required" })
        return
    }

    let addUser = await pool.request()
        .input('user_first', sql.NVarChar, user_first)
        .input('user_last', sql.NVarChar, user_last)
        .query(`
                        INSERT INTO Users(u_first_name, u_last_name)
                        VALUES (@user_first, @user_last);

                        SELECT * FROM Users where u_id = (SELECT max(u_id) FROM Users);
                    `)


    let addBooking = await pool.request()
        .input('vehicle_id', sql.Int, vehicle_id)
        .input('user_id', sql.Int, addUser.recordset[0].u_id)
        .input('start_date', sql.DateTime, start_date)
        .input('end_date', sql.DateTime, end_date)
        .query(`
                    INSERT INTO Rentals(r_vehicle_id, r_user_id, r_start_date, r_end_date)
                    VALUES (@vehicle_id, @user_id, @start_date, @end_date);

                    UPDATE Vehicles SET vehicle_availability = 0 WHERE vehicle_id = @vehicle_id

                    select * from Rentals where rental_id = (select max(rental_id) from Rentals)
                `)

    res.status(200).send({ error: false, message: 'Booking confirm !', data: addBooking.recordsets[0]})
    return



})

module.exports = router