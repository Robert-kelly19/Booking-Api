import express from 'express'
import { createtimeSlotValidator } from '../validator/timeslot-validator.js'
import { createTimeSlot, getTimeSlot } from '../controller/timeslot-controller.js'
import Auth from '../middlewares/Authmiddleware.js'
const router = express.Router()

router.post("/create-slot",createtimeSlotValidator, Auth, createTimeSlot )

// router.get("/getslot", Auth, getTimeSlot )

export default router