import mongoose from "mongoose";

const templatePageSchema = mongoose.Schema({
    template: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Template',
        required: true
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

const TemplatePage = mongoose.model('TemplatePage', templatePageSchema)

export default TemplatePage