import mongoose from "mongoose";
/* models */
import Template from "../models/Template.js";
import TemplatePage from "../models/TemplatePage.js";
import TemplateSection from "../models/TemplateSection.js";
import TemplateElement from "../models/TemplateElement.js";
/* helpers */
import randomNumber from "../helpers/randomNumber.js";

const ObjectId = mongoose.Types.ObjectId;

const getTemplates = async (req, res) => {
    const { limit } = req.query;

    if(!limit) {
        return res.json({ success: true, data: await Template.find({ status: 'active' }) });
    }

    return res.json({ success: true, data: await Template.find({ status: 'active' }).limit(limit) });
}

const getTemplate = async (req, res) => {
    const { id } = req.body;
    const { populate } = req.query;

    const template = await Template.findOne({id})
    if(!template) {
        return res.json({ success: false, msg: "No template found" });
    }
    
    if(!populate) {
        return res.json({ success: true, data: await Template.findOne({id}) });
    }

    switch (populate) {
        case '1':
            return res.json({ 
                success: true, 
                data: await Template.findOne({id}).populate({
                    path: 'pages', 
                    select: '-createdAt -updatedAt -__v'
                })
            });
        case '2':
            return res.json({ 
                success: true, 
                data: await Template.findOne({id}).populate({
                    path: 'pages', 
                    select: '-createdAt -updatedAt -__v',
                    populate: { 
                        path: 'sections',
                        select: '-createdAt -updatedAt -__v'
                    }
                })
            });
        case '3':
            return res.json({
                success: true, 
                data: await Template.findOne({id}).populate({ 
                    path: 'pages', 
                    select: '-createdAt -updatedAt -__v',
                    populate: { 
                        path: 'sections', 
                        select: '-createdAt -updatedAt -__v',
                        populate: { 
                            path: 'elements',
                            select: '-createdAt -updatedAt -__v'
                        }, 
                    }
                }) 
            });
    }
}

const createTemplate = async (req, res) => {
    const { component, madeBy } = req.body;
    
    if(!component || !madeBy) {
        return res.json({ msg: 'Mission something', success: false })
    }

    const template = new Template(req.body)
    template.id = randomNumber();
    await template.save();

    return res.json({ success: true })
}

const editTemplate = async (req, res) => {
    const { component, id, status, _id } = req.body;

    if(!ObjectId.isValid(_id)) {
        return res.json({ msg: 'Invalid ID', success: false })
    }

    if(!component || !status) {
        return res.json({ msg: 'Nothing to change', success: false })
    }

    if(status.includes('active') || status.includes('maintenance') || status.includes('inactive')) {
        const template = await Template.findById(_id);
        template.component = component;
        template.status = status;
        template.id = id;
        await template.save();
        return res.json({ success: true })
    }

    return res.json({ msg: 'Bad status value', success: false })
}

const deleteTemplate = async(req, res) => {
    const { _id } = req.body;

    if(!ObjectId.isValid(_id)) {
        return res.json({ msg: 'Invalid ID', success: false })
    }

    const template = await Template.findById(_id);
    await template.remove();
    return res.json({ success: true })
}

const createPage = async (req, res) => {
    const { template, name, url, sections } = req.body;

    if(!ObjectId.isValid(template)) {
        return res.json({ msg: 'Invalid ID', success: false })
    }

    if(!name || !url || !sections) {
        return res.json({ msg: `Missing something`, success: false })
    }

    try {        
        const page = await new TemplatePage(req.body);
        await page.save();
        const templateDB = await Template.findById(template);
        templateDB.pages.push(page._id);
        await templateDB.save();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ msg: 'There was a mistake', success: false })
    }
}

const createSection = async (req, res) => {
    const { name, component } = req.body;

    if(!name || !component) {
        return res.json({ msg: `Missing something`, success: false })
    }

    try {
        const section = await new TemplateSection(req.body);
        await section.save();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ msg: 'There was a mistake', success: false })
    }
}

const createElement = async (req, res) => {
    const { component, value } = req.body;

    if(!component) {
        return res.json({ msg: '"component" is needed', success: false })
    }

    if(value?.properties) {
        const { link, size, align, bg } = value.properties;
        if(link) {
            link.toLowerCase();
        }
        if(size && !['small', 'medium', 'large', 'extra'].includes(size)) {
            return res.json({ msg: '"size" values: small, medium, large, extra', success: false })
        }
        if(align && !['left', 'center', 'right'].includes(align)) {
            return res.json({ msg: '"align" values: left, center, right', success: false })
        }
        if(bg && !['bg-1', 'bg-2'].includes(align)) {
            return res.json({ msg: '"bg" values: bg-1, bg-2', success: false })
        }
    }

    try {
        const element = await new TemplateElement(req.body);
        await element.save();
        return res.json({ success: true })
    } catch (error) {
        return res.json({ msg: 'There was a mistake', success: false })
    }
}

export {
    getTemplates,
    getTemplate,
    createTemplate,
    editTemplate,
    deleteTemplate,
    createPage,
    createSection,
    createElement
}