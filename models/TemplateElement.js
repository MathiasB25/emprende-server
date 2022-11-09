import mongoose from "mongoose";

const templateElementSchema = mongoose.Schema({
    name: {
        type: String
    },
    component: {
        type: String,
        required: true
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
        price: {
            amount: {
                type: Number
            },
            currency: {
                type: String
            },
            soldOut: {
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
            align: {
                type: String,
                enum: ['left', 'center', 'right']
            },
            bg: {
                type: String,
                enum: ['bg-1', 'bg-2']
            }
        }
    }
}, {
    timestamps: true
})

const TemplateElement = mongoose.model('TemplateElement', templateElementSchema)

export default TemplateElement