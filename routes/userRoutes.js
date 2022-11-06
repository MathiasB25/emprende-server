import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { register, authenticate, confirm, resetPassword, checkToken, newPassword, profile, editProfile, disable } from '../controllers/userController.js'

const router = express.Router()

// Authentication, registration and confirmation of Users
router.post('/', register) //Create new user
router.post('/login', authenticate) //Authenticate user
router.get('/confirm/:token', confirm) // Confirm user
router.post('/reset-password', resetPassword)
router.route('/reset-password/:token').get(checkToken).post(newPassword)

router.get('/profile', checkAuth, profile)
router.post('/edit', checkAuth, editProfile)
router.post('/disable', checkAuth, disable)

export default router