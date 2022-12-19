import mongoose from "mongoose";

const storeProductSchema = mongoose.Schema({
    store: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Store'
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
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    costPerItem: {
        type: Number
    },
    media: [
        { 
            type: String,
            element: {
                type: String,
                enum: ['Video', 'Image']
            }
        }
    ],
    status: {
        type: String,
        enum: ['active', 'draft']
    },
    inventory: {
        stock: {
            type: Number
        },
        sellWithoutStock: {
            type: Boolean,
            default: false
        }
    },
    shipping: [
        {
            weight: {
                type: Number,
                unit: {
                    type: String,
                    enum: ['kg', 'lb', 'oz', 'g']
                }
            },
            manufactured: {
                type: String,
                enum: ['uruguay', 'argentina', 'chile', 'brasil', 'usa', 'china']
            }
        }
    ],
    options: [
        {
            type: String,
            enum: ['color', 'size', 'material', 'style'],
            value: {
                type: String
            }
        }
    ]
}, {
    timestamps: true
})

const StoreProduct = mongoose.model('StoreProduct', storeProductSchema)

export default StoreProduct