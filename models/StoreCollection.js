import mongoose from "mongoose";

const storeCollectionSchema = mongoose.Schema({
    store: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Store',
        required: true
    },
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    media: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
})

const StoreCollection = mongoose.model('StoreCollection', storeCollectionSchema)

export default StoreCollection