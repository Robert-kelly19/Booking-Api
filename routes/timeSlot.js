import express from 'express'
import { createtimeSlotValidator, getslotIdvalidator } from '../validator/timeslot-validator.js'
import { createTimeSlot, getSlotBYId, getTimeSlot, updateTimeSlot } from '../controller/timeslot-controller.js'
import Auth from '../middlewares/Authmiddleware.js'
const router = express.Router()

router.post("/create-slot",createtimeSlotValidator, Auth, createTimeSlot )

router.get("/getslot", Auth, getTimeSlot )

router.get("/:id",getslotIdvalidator, Auth, getSlotBYId)

router.put("/:id/updateSlot",getslotIdvalidator, Auth, createtimeSlotValidator, updateTimeSlot)

export default router