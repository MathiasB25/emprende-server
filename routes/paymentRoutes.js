import express from 'express'
import checkAdmin from '../middleware/checkAdmin.js';
import { createMethod, editMethod, deleteMethod } from '../controllers/paymentController.js'

const router = express.Router()

router.route('/method')
    .post(checkAdmin, createMethod)
    .patch(checkAdmin, editMethod)
    .delete(checkAdmin, deleteMethod);

export default router