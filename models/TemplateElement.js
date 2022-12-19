import mongoose, { Schema } from "mongoose";

const templateElementSchema = mongoose.Schema({
    name: {
        type: String
    },
    component: {
        type: String,
        required: true
    },
    storeCollection: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'StoreCollection'
    },
    value: {
        heading: {
            type: String
        },
        text: {
            type: String
        },
        description: {
            type: String
        },
        media: {
            type: String
        },
        href: {
            type: String
        },
        alt: {
            type: String
        },
        price: {
            price: {
                type: Number
            },
            currency: {
                type: String
            },
            stock: {
                type: Boolean
            }
        },
        properties: {
            link: {
                type: String
            },
            size: {
                type: String,
                enum: ['small', 'medium', 'large', 'extra']
            },
            weigth: {
                type: String
            },
            width: {
                type: String
            },
            align: {
                type: String,
                enum: ['left', 'center', 'right']
            },
            bg: {
                type: String
            },
            color: {
                type: String
            },
            aspectRatio: {
                type: String
            }
        }
    }
}, {
    timestamps: true
})

const TemplateElement = mongoose.model('TemplateElement', templateElementSchema)

export default TemplateElement