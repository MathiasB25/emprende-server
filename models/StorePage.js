import mongoose from "mongoose";

const storePageSchema = mongoose.Schema({
    store: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Store'
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    sections: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'TemplateSection'
        }
    ]
}, {
    timestamps: true
})

const StorePage = mongoose.model('StorePage', storePageSchema)

export default StorePage