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
        name: String,
        component: String,
        id: String,
        elements: [
            {
                name: String,
                component: String,
                id: String,
                value: {
                    text: {
                        type: String,
                        default: "Ejemplo de texto"
                    },
                    properties: {
                        size: {
                            type: String,
                            enum: ['xs', 'sm', 'base'],
                            default: "sm"
                        }
                    }
                },
            },
        ],
    },
    pages: [
        {
            name: String,
            url: String,
            sections: [
                {
                    name: String,
                    component: String,
                    id: String,
                    elements: [
                        {
                            name: String,
                            component: String,
                            id: String,
                            storeCollection: {
                                type: mongoose.SchemaTypes.ObjectId
                            },
                            storeProduct: {
                                type: mongoose.SchemaTypes.ObjectId
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
                        }
                    ],
                    style: {
                        height: {
                            type: String,
                            enum: ['sm', 'md', 'lg'],
                            default: 'md'
                        }
                    }
                }
            ]
        }
    ],
    footer: {
        name: String,
        component: String,
        id: String,
        elements: [
            {
                name: String,
                component: String,
                id: String,
                storeMenu: {
                    type: String
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
                        }
                    }
                }
            }
        ]
    }
}, {
    timestamps: true
})

const Template = mongoose.model('StoreTemplate', storeTemplateSchema)

export default Template