const express = require("express")
const router = express.Router()

const vehicle = require("./controllers/vehicle.controller")
router.use('/vehicle', vehicle)

module.exports = router