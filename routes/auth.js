import express from 'express'
import userRegisterHandler from '../controller/userRegister-controller.js'
import { validate, userLoginvalidator } from '../validator/user-validator.js'
import Auth from '../middlewares/Authmiddleware.js'

const router = express.Router()
router.post("/register",validate, userRegisterHandler )

export default router