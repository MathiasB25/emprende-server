import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import checkPayment from '../middleware/checkPayment.js'
import { getStore, createStore, editStore, deleteStore, createOrder, editOrder, deleteOrder } from '../controllers/storeController.js'

const router = express.Router()

router.route('/')
    .post(checkAuth, createStore)
    .patch(checkAuth, editStore)
    .delete(checkAuth, deleteStore);
router.post('/get', checkAuth, getStore);
/* Store order routes */
router.route('/order')
    .post(checkPayment, createOrder)
    .patch(checkPayment, editOrder)
    .delete(checkPayment, deleteOrder);

export default router