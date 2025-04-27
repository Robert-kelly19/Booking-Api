import express from 'express'
import userRegisterHandler from '../controller/userRegister-controller.js'
import { validate, userLoginvalidator } from '../validator/user-validator.js'
import Auth from '../middlewares/Authmiddleware.js'
import loginHandler from '../controller/userLogin-controller.js'

const router = express.Router()
router.post("/register",validate, userRegisterHandler )

router.post("/login", userLoginvalidator, loginHandler)

export default router