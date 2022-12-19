import mongoose from "mongoose"
// Models
import Store from "../models/Store.js"
import StoreOrder from "../models/StoreOrder.js";
import StoreTemplate from '../models/StoreTemplate.js'
import StoreCollection from "../models/StoreCollection.js";
import StoreProduct from '../models/StoreProduct.js'
import Template from "../models/Template.js";
// Helpers
import createToken from "../helpers/createToken.js";
import randomNumber from "../helpers/randomNumber.js";

const ObjectId = mongoose.Types.ObjectId;

const getStore = async (req, res) => {
    const { user: reqUser } = req;
    const { _id } = reqUser;
    const { user, template } = req.query;
    if(!ObjectId.isValid(_id)) {
        return res.json({ msg: 'Invalid ID', success: false })
    }

    if(user === 'true' && template === 'true') {
        const store = await Store.find({user: new ObjectId(_id)}).populate('user', 'email name surname').populate('template', '-createdAt -updatedAt -__v').select('-createdAt -updatedAt -__v');
        if(store.length !== 0) {
            return res.json({ success: true, data: store })
        }
        return res.json({ success: false })
    }

    if(user === 'true') {
        const store = await Store.find({user: new ObjectId(_id)}).populate('ownedTemplates').populate('user', 'email name surname').select('-createdAt -updatedAt -__v');
        if(store.length !== 0) {
            return res.json({ success: true, data: store })
        }
        return res.json({ success: false })
    }

    if(template === 'true') {
        const store = await Store.find({user: new ObjectId(_id)}).populate('ownedTemplates').populate('template', '-createdAt -updatedAt -__v').select('-createdAt -updatedAt -__v');
        if(store.length !== 0) {
            return res.json({ success: true, data: store })
        }
        return res.json({ success: false })
    }

    const store = await Store.find({user: new ObjectId(_id)}).populate('ownedTemplates').select('-createdAt -updatedAt -__v');
    if(store.length !== 0) {
        return res.json({ success: true, data: store })
    }
    return res.status('404').json({ success: false, msg: 'No store found' })
}

const createStore = async (req, res) => {
    const { user } = req;
    const { name } = req.body
    
    if(!name) {
        return res.json({ msg: 'Missing something', success: false })
    }

    if(name.length <= 2) {
        return res.json({ success: false, msg: 'El nombre de tu tienda debe tener más de 2 letras' })
    }

    if(name.length >= 50) {
        return res.json({ success: false, msg: 'El nombre de tu tienda debe tener menos de 50 letras' })
    }
    
    if(!/(^[a-zA-Z0-9_ ]*$)|(^[^ !"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+$)/.test(name)) {
        return res.json({ success: false, msg: "Name can't contain symbols" })
    }

    const hasStore = await Store.findOne({ user })
    if(hasStore) {
        return res.json({ success: false, msg: 'Ya tienes una tienda' })
    }

    const storeExists = await Store.findOne({ url: req.body.name.trim().toLowerCase() })
    if(storeExists) {
        return res.json({ success: false, msg: 'Esta tienda ya existe' })
    }

    req.body.user = user;
    req.body.url = req.body.name.replace(/\s/g, "").toLowerCase();
    const store = new Store(req.body);
    const storeCollection = new StoreCollection({
        store: store._id,
        title: "Todo",
        id: "all",
        products: []
    });

    await store.save();
    await storeCollection.save();

    return res.json({ success: true, data: store })
}

const editStore = async (req, res) => {
    const { name, template, _id } = req.body;

    if(!ObjectId.isValid(template) || !ObjectId.isValid(_id)) {
        return res.json({ msg: 'Invalid ID', success: false })
    }

    if(!name || !template) {
        return res.json({ msg: 'Missing something', success: false })
    }

    const store = await Store.findById(_id);
    store.name = name;
    store.template = template;
    await store.save();

    return res.json({ success: true })
}

const deleteStore = async (req, res) => {
    const { user } = req;

    if(!ObjectId.isValid(user._id)) {
        return res.json({ success: false, msg: 'Invalid ID' })
    }

    const store = await Store.findOne({user: user._id});
    if(!store) {
        return res.json({ success: false, msg: 'No store found' })
    }
    // Delete store collections
    await StoreCollection.deleteMany({ store: store._id });
    // Delete store added templates
    await StoreTemplate.deleteMany({ store: store._id });
    // TODO: When user deletes store, remove from DB: Products, Orders
    // Delete store products
    // ...
    // Delete store orders
    // ...

    await store.remove();
    return res.json({ success: true })
}

const createOrder = async (req, res) => {

}

const editOrder = async (req, res) => {
    
}

const deleteOrder = async (req, res) => {
    
}

const addTemplate = async (req, res) => {
    const { user } = req;
    const { template: templateId } = req.body;
    
    if(!ObjectId.isValid(templateId)) {
        return res.json({ success: false, msg: "Invalid ID" })
    }

    const template = await Template.findById(templateId);
    if(!template) {
        return res.json({ success: false, msg: "Template not found" })
    }

    const store = await Store.findOne({ user: user._id })
    if(!store) {
        return res.json({ success: false, msg: "Store not found" })
    }

    // If store already has the template, then removes it from array.
    const newTemplates = store.ownedTemplates.filter( item => item.toString() != template._id.toString());
    store.ownedTemplates = newTemplates;
    // Add the new template to the ownedTemplates array.
    store.ownedTemplates.push(templateId);

    try {
        await store.save();
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, msg: "There was a mistake" });
    }
}

const setTemplate = async (req, res) => {
    const { user } = req;
    const { template: templateId } = req.body;

    if(!ObjectId.isValid(templateId)) {
        return res.json({ success: false, msg: "Invalid ID" })
    }

    const template = await Template.findById(templateId).populate({ 
        path: 'pages', 
        select: '-createdAt -updatedAt -__v',
        populate: { 
            path: 'sections', 
            select: '-createdAt -updatedAt -__v',
            populate: { 
                path: 'elements',
                select: '-createdAt -updatedAt -__v'
            }, 
        }
    });
    if(!template) {
        return res.json({ success: false, msg: "Template not found" })
    }

    const store = await Store.findOne({ user: user._id })
    if(!store) {
        return res.json({ success: false, msg: "Store not found" })
    }
    
    const templateExists = await StoreTemplate.findOne({ store: store._id }) || {};
    
    if(store.template && Object.keys(templateExists).length != 0) {
        templateExists.remove();
    }

    // If store already has the template, then removes it from array.
    const newTemplates = store.ownedTemplates.filter( item => item.toString() != template._id.toString());
    store.ownedTemplates = newTemplates;
    
    // Set new template to Store Model 
    store.template = template._id;
    store.ownedTemplates.push(template._id);
    // new StoreTemplate Model
    const newStoreTemplate = new StoreTemplate({ 
        store: store._id,
        component: template.component,
        pages: template.pages,
        template: template._id
    });
    
    // Save to DB
    try {
        await store.save();
        await newStoreTemplate.save();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, msg: "There was a mistake" })
    }
}

const updateTemplate = async (req, res) => {
    
}

const deleteTemplate = async (req, res) => {
    
}

const getCollections = async (req, res) => {
    const { storeUrl } = req.params;

    const store = await Store.findOne({ url: storeUrl });
    if(!store) {
        return res.json({ success: false, msg: "Store not found" })
    }

    const collections = await StoreCollection.find({store: store._id}).select('title description id media products -_id');
    return res.json({ success: true, data: collections })
}

const createCollection = async (req, res) => {
    const { user: reqUser } = req;
    const { title } = req.body;

    if(!title) {
        return res.json({ success: false, msg: 'Title is required' });
    }

    const store = await Store.findOne({ user: reqUser._id });
    if(!store) {
        return res.json({ success: false, msg: 'No store found' });
    }

    req.body.store = store;
    req.body.id = randomNumber().slice(0, 6);
    const newCollection = new StoreCollection(req.body);

    try {
        await newCollection.save();
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, msg: 'There was a mistake' });
    }
}

const updateCollection = async (req, res) => {
    const { user: reqUser } = req;
    const { collectionId } = req.params;

    const collection = await StoreCollection.findOne({ id: collectionId });
    if(!collection) {
        return res.json({ success: false, msg: 'No collection found' });
    }

    const store = await Store.findOne({ user: reqUser._id });
    if(store.user.toString() !== reqUser._id.toString()) {
        return res.json({ success: false, msg: 'You are not allowed to update this collection' })
    }

    collection.title = req.body.title;
    collection.description = req.body.description;
    collection.media = req.body.media;
    if(req.body.status === 'active' || req.body.status === 'inactive') {
        collection.status = req.body.status
    }

    try {
        await collection.save();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, msg: 'There was a mistake' });
    }
}

const deleteCollection = async (req, res) => {
    const { user: reqUser } = req;
    const { collectionId } = req.params;

    const collection = await StoreCollection.findOne({ id: collectionId });
    if(!collection) {
        return res.json({ success: false, msg: 'No collection found' });
    }
    
    const store = await Store.findOne({ user: reqUser._id });
    if(store.user.toString() !== reqUser._id.toString()) {
        return res.json({ success: false, msg: 'You are not allowed to delete this collection' });
    }

    try {
        await collection.remove();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, msg: 'There was a mistake' });
    }
}
















const getProducts = async (req, res) => {
    const { storeUrl } = req.params;

    const store = await Store.findOne({ url: storeUrl });
    if(!store) {
        return res.json({ success: false, msg: "Store not found" })
    }

    const products = await StoreProduct.find({ store: store._id }).select('-_id -store -__v -createdAt -updatedAt');
    return res.json({ success: true, data: products })
}

const createProduct = async (req, res) => {
    const { user: reqUser } = req;
    const { title, price } = req.body;

    if(!title || !price) {
        return res.json({ success: false, msg: 'title or price is required' });
    }

    const store = await Store.findOne({ user: reqUser._id });
    if(!store) {
        return res.json({ success: false, msg: 'No store found' });
    }

    req.body.store = store;
    req.body.id = randomNumber().slice(0, 8);
    const newProduct = new StoreProduct(req.body);

    try {
        await newProduct.save();
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, msg: 'There was a mistake' });
    }
}

const updateProduct = async (req, res) => {
    const { user: reqUser } = req;
    const { productId } = req.params;

    const product = await StoreProduct.findOne({ id: productId });
    if(!product) {
        return res.json({ success: false, msg: 'No product found' });
    }

    const store = await Store.findOne({ user: reqUser._id });
    if(store.user.toString() !== reqUser._id.toString()) {
        return res.json({ success: false, msg: 'You are not allowed to update this product' })
    }

    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.costPerItem = req.body.costPerItem;
    product.media = req.body.media;
    product.inventory = req.body.inventory;
    product.shipping = req.body.shipping;
    product.options = req.body.options;
    if(req.body.status === 'active' || req.body.status === 'draft') {
        product.status = req.body.status
    }

    try {
        await product.save();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, msg: 'There was a mistake' });
    }
}

const deleteProduct = async (req, res) => {
    const { user: reqUser } = req;
    const { productId } = req.params;

    const product = await StoreProduct.findOne({ id: productId });
    if(!product) {
        return res.json({ success: false, msg: 'No product found' });
    }
    
    const store = await Store.findOne({ user: reqUser._id });
    if(store.user.toString() !== reqUser._id.toString()) {
        return res.json({ success: false, msg: 'You are not allowed to delete this product' });
    }

    try {
        await product.remove();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, msg: 'There was a mistake' });
    }
}

export {
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
}
