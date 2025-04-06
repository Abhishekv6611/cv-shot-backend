import express from 'express'
import {Signin, Signup} from '../controller/auth.js'

const router=express.Router()

router.post('/sign-in',Signin)
router.post('/sign-up',Signup)



export default  router