import mongoose from "mongoose";

const storeTemplateSchema = mongoose.Schema({
    store: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Store',
        required: true
    },
    template: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Template',
        required: true
    },
    component: {
        type: String,
        required: true
    },
    announceBar: {
        text: {
            type: String,
            default: "Ejemplo de texto"
        },
        size: {
            type: String,
            enum: ['xs', 'sm', 'base'],
            default: "sm"
        }
    },
    pages: [
        {
            name: String,
            url: String,
            sections: [
                {
                    name: String,
                    component: String,
                    elements: [
                        {
                            name: String,
                            component: String,
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
                        }
                    ],
                    style: {
                        height: {
                            type: String,
                            enum: ['small', 'medium', 'large'],
                            default: 'medium'
                        }
                    }
                }
            ]
        }
    ]
}, {
    timestamps: true
})

const Template = mongoose.model('StoreTemplate', storeTemplateSchema)

export default Template