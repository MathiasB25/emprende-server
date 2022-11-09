import mongoose from "mongoose";

const paymentMethodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    media: [
        {
            type: String
        }
    ],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
})

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema)

export default PaymentMethod