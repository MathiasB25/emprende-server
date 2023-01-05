import mongoose from "mongoose";

const templateElementSchema = mongoose.Schema({
    name: {
        type: String
    },
    component: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    storeCollection: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'StoreCollection'
    },
    storeProduct: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'StoreProduct'
    },
    storeMenu: {
        type: String,
        // ref: 'StoreMenu'
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
                enum: ['sm', 'md', 'lg', 'xl']
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