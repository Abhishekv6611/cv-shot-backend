import express from 'express'
import {ForgetPassword, ResetPassword, Signin, Signup} from '../controller/auth.js'

const router=express.Router()

router.post('/sign-in',Signin)
router.post('/sign-up',Signup)
router.post('/forgetpassword',ForgetPassword)
router.post('/resetpassword/:token',ResetPassword)



export default  router