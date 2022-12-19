import express from 'express'
import { getStore } from '../controllers/storeController.js'

const router = express.Router()

router.get('/:url', getStore);

export default router