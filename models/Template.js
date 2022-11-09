import mongoose from "mongoose";

const templateSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    component: {
        type: String,
        required: true
    },
    madeBy: {
        email: {
            type: String
        },
        name: {
            type: String
        },
        surname: {
            type: String
        },
        alias: {
            type: String
        }
    },
    previewImg: {
        type: String,
        default: "https://res.cloudinary.com/dlvsdz9k1/image/upload/v1667917667/tbdefault.png"
    },
    pages: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'TemplatePage'
        }
    ],
    status: {
        type: String,
        enum: ['active', 'maintenance', 'inactive']
    }
}, {
    timestamps: true
})

const Template = mongoose.model('Template', templateSchema)

export default Template