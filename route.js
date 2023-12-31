const express = require("express")
const router = express.Router()

const getVehicle = require("./controllers/getVehicle.controller")
router.use('/get', getVehicle)

const addVehicle = require("./controllers/addVehicle.controller")
router.use('/add', addVehicle)

const runScripts = require("./controllers/InitializeSxripts")
router.use('/run', runScripts)


module.exports = router