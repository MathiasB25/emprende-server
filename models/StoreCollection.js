import mongoose from "mongoose";

const storeCollectionSchema = mongoose.Schema({
    store: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Store'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    media: {
        type: String
    },
    products: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'StoreProduct'
        }
    ],
    status: {
        type: String,
        enum: ['active', 'inactive']
    }
}, {
    timestamps: true
})

const StoreCollection = mongoose.model('StoreCollection', storeCollectionSchema)

export default StoreCollection