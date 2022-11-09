import mongoose from "mongoose";
import PaymentMethod from "../models/PaymentMethod.js";

const ObjectId = mongoose.Types.ObjectId;

const createMethod = async (req, res) => {
    const { name, media } = req.body;

    if(!name || !media) {
        return res.json({ msg: 'Missing something', success: false })
    }

    try {
        const method = await new PaymentMethod(req.body);
        await method.save();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ msg: 'There was a mistake', success: false })
    }
}

const editMethod = async (req, res) => {
    const { _id, status, name, media } = req.body;

    if(!ObjectId.isValid(_id)) {
        return res.json({ msg: 'Invalid ID', success: false })
    }

    if(!name || !media || !_id || !status) {
        return res.json({ msg: 'Missing something', success: false })
    }

    if(status && !['active', 'inactive'].includes(status)) {
        return res.json({ msg: '"status" values: active, inactive', success: false })
    }

    try {
        const method = await PaymentMethod.findById(_id);
        method.name = name;
        method.media = media;
        method.status = status;
        await method.save();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ msg: 'There was a mistake', success: false })
    }
}

const deleteMethod = async (req, res) => {
    const { _id } = req.body; 

    if(!ObjectId.isValid(_id)) {
        return res.json({ msg: 'Invalid ID', success: false })
    }

    try {
        const method = await PaymentMethod.findById(_id);
        await method.delete();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ msg: 'There was a mistake', success: false })
    }
}

export {
    createMethod,
    editMethod,
    deleteMethod
}