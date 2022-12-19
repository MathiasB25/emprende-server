import Store from '../models/Store.js'
import StoreTemplate from '../models/StoreTemplate.js'

export const getStore = async (req, res) => {
    const { url } = req.params;
    const store = await Store.findOne({ url });

    if(!store) {
        return res.status(404).json({ success: false, msg: 'Store not found' });
    }

    if(!store.template) {
        return res.json({ success: false, msg: 'Set template first' })
    }
    const storeTemplate = await StoreTemplate.findOne({ template: store.template._id }).populate({path: 'store', select: 'name -_id'}).select('-createdAt -updatedAt -__v -_id');
    return res.status(200).json({ success: true, data: storeTemplate });
}