import mongoose from "mongoose";

const storeOrderSchema = mongoose.Schema({
    store: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Store',
        required: true
    },
    orderedBy: {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            address: {
                type: String,
                required: true
            },
            zipCode: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            state: {
                type: String
            }
        }
    },
    products: [
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            }
        }
    ],
    payment: {
        subtotal: {
            type: Number,
            required: true
        },
        discount: {
            type: Number
        },
        shipping: {
            type: Number
        },
        tax: {
            type: Number
        },
        total: {
            type: Number,
            required: true
        },
        method: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'PaymentMethod'
        }
    },
    note: {
        type: String
    }
}, {
    timestamps: true
})

const StoreOrder = mongoose.model('StoreOrder', storeOrderSchema)

export default StoreOrder