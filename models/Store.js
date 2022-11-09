import mongoose from "mongoose";

const storeSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true  
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    template: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Template',
        required: true
    }
}, {
    timestamps: true
})

const Store = mongoose.model('Store', storeSchema)

export default Store