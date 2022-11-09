import mongoose from "mongoose"
/* models */
import Store from "../models/Store.js"
import StoreOrder from "../models/StoreOrder.js";
import Template from "../models/Template.js";
/* helpers */
import createToken from "../helpers/createToken.js";

const ObjectId = mongoose.Types.ObjectId;

const getStore = async (req, res) => {
    const { _id } = req.body;
    const { user, template } = req.query;

    if(user === 'true' && template === 'true') {
        const store = await Store.findById(_id).populate('user').populate('template');
        return res.json({ success: true, data: store })
    }

    if(user === 'true') {
        const store = await Store.findById(_id).populate('user');
        return res.json({ success: true, data: store })
    }

    if(template === 'true') {
        const store = await Store.findById(_id).populate('template');
        return res.json({ success: true, data: store })
    }

    const store = await Store.findById(_id);
    return res.json({ success: true, data: store })
}

const createStore = async (req, res) => {
    const { user } = req;
    const { name, template } = req.body

    const storeDB = await Store.findOne({ user })
    if(storeDB) {
        return res.json({ msg: 'Already has store', success: false })
    }

    if(!ObjectId.isValid(template)) {
        return res.json({ msg: 'Invalid ID', success: false })
    }

    if(!name || !template) {
        return res.json({ msg: 'Missing something', success: false })
    }

    const templateExists = await Template.findById(template);
    if(!templateExists) {
        return res.json({ msg: 'Template not found', success: false })
    }

    req.body.user = user;
    const store = new Store(req.body);
    store.url = createToken().slice(0, 12);
    await store.save();

    return res.json({ success: true })
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
    const { _id } = req.body;

    if(ObjectId.isValid(_id)) {
        return res.json({ msg: 'Invalid ID', success: false })
    }

    const store = await Store.findById(_id);
    await store.remove();
    return res.json({ success: true })
}

const createOrder = async (req, res) => {

}

const editOrder = async (req, res) => {
    
}

const deleteOrder = async (req, res) => {
    
}

export {
    getStore,
    createStore,
    editStore,
    deleteStore,
    createOrder,
    editOrder,
    deleteOrder
}
