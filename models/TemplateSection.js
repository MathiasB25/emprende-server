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
    id: String,
    elements: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'TemplateElement'
        }
    ],
    style: {
        height: {
            type: String,
            enum: ['sm', 'md', 'lg'],
            default: 'md'
        }
    }
}, {
    timestamps: true
})

const TemplateSection = mongoose.model('TemplateSection', templateSectionSchema)

export default TemplateSection