import express from 'express'
import userRegisterHandler from '../controller/userRegister-controller.js'
import { validateUser, userLoginvalidator } from '../validator/user-validator.js'
import Auth from '../middlewares/Authmiddleware.js'
import loginHandler from '../controller/userLogin-controller.js'
import providerRegisterHandler from '../controller/providerRegistration-controller.js'
import { validateProvider} from '../validator/provider-validator.js'

const router = express.Router()
router.post("/userRegister",validateUser, userRegisterHandler )

router.post("/userlogin", userLoginvalidator, loginHandler)

router.post("/providerRegister", validateProvider, providerRegisterHandler,)

export default router