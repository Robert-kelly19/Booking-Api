import express from 'express'
import userRegisterHandler from '../controller/userRegister-controller.js'
import { validateUser, userLoginvalidator } from '../validator/user-validator.js'
import Auth from '../middlewares/Authmiddleware.js'
import userloginHandler from '../controller/userLogin-controller.js'
import providerRegisterHandler from '../controller/providerRegistration-controller.js'
import { providerLoginvalidator, validateProvider} from '../validator/provider-validator.js'
import providerloginHandler from '../controller/providerLogin-controller.js'

const router = express.Router()
router.post("/userRegister",validateUser, userRegisterHandler )

router.post("/userlogin", userLoginvalidator, userloginHandler)

router.post("/providerRegister", validateProvider, providerRegisterHandler,)

router.post("/providerlogin",providerLoginvalidator,providerloginHandler)

export default router