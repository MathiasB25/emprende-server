import mongoose, { Schema } from "mongoose";

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
        trim: true,
        unique: true
    },
    template: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Template',
        default: null
    },
    ownedTemplates: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Template'
        }
    ]
}, {
    timestamps: true
})

const Store = mongoose.model('Store', storeSchema)

export default Store