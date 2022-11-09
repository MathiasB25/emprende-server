import mongoose from "mongoose";

const templateSectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    component: {
        type: String,
        required: true
    },
    elements: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'TemplateElement'
        }
    ],
    media: {
        type: String
    }
}, {
    timestamps: true
})

const TemplateSection = mongoose.model('TemplateSection', templateSectionSchema)

export default TemplateSection