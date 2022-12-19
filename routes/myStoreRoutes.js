import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import checkPayment from '../middleware/checkPayment.js'
import { 
    getStore, 
    createStore, 
    editStore, 
    deleteStore, 
    createOrder, 
    editOrder, 
    deleteOrder, 
    addTemplate,
    setTemplate, 
    updateTemplate, 
    deleteTemplate,
    getCollections,
    createCollection,
    updateCollection,
    deleteCollection,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/myStoreController.js'

const router = express.Router()

router.route('/')
    .post(checkAuth, createStore)
    .patch(checkAuth, editStore)
    .delete(checkAuth, deleteStore);
router.get('/get', checkAuth, getStore);
/* Store order routes */
router.route('/order')
    .post(checkPayment, createOrder)
    .patch(checkPayment, editOrder)
    .delete(checkPayment, deleteOrder);
router.route('/template')
    .post(checkAuth, setTemplate)
    .patch(checkAuth, updateTemplate)
    .delete(checkAuth, deleteTemplate);
router.post('/template/add', checkAuth, addTemplate);
router.post('/collections', checkAuth, createCollection)
router.route('/collections/:collectionId')
    .get(getCollections)
    .patch(checkAuth, updateCollection)
    .delete(checkAuth, deleteCollection);
router.post('/products', checkAuth, createProduct)
router.route('/products/:productId')
    .get(getProducts)
    .patch(checkAuth, updateProduct)
    .delete(checkAuth, deleteProduct);

export default router