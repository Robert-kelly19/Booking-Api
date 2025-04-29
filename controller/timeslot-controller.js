import { query } from "../config/db.js";
import logger from '../utils/logger.js'

export async function createTimeSlot(req,res,next) {
    const {day,startTime,endTime} = req.body
    const providerId = req.user.id

    try {
        const insertTimeSlot =`INSERT INTO timeslot (owner_id, day,start_time, end_time) 
                               VALUES ($1,$2,$3,$4) RETURNING *;
                               `;

    const result = await query(insertTimeSlot, [providerId,day, startTime, endTime])
    const newTimeSlot = result.rows[0]
    logger.info(`successfully created timeslot ${newTimeSlot.id} by ${providerId}`)
    return res.status(201).json(newTimeSlot)
    } catch (error) {
        logger.error(`Error creating time slot for ${providerId}:`, error)
        return res.status(500).json({message: error.message || 'server error while creating time slot'})
    }
}

export async function getTimeSlot(req,res,next) {
    const providerId=req.user.id
    try {
        const getslot = `SELECT day, start_time, end_time, is_reserved FROM timeslot WHERE owner_id = $1`;
        const newResult= await query(getslot,[providerId])
        logger.debug(`fetched ${newResult.rows.length} time slot for provider:${providerId}`)
        return res.status(200).json(newResult.rows)
    } catch (error) {
        logger.error(`failed to get time slot for provider: ${providerId}`)
        return res.status(500).json({message: error.message|| 'server error while fetching time slot '})
    }
}