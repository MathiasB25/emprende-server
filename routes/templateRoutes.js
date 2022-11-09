import express from 'express'
import checkAdmin from '../middleware/checkAdmin.js'
import { getTemplates, getTemplate, createTemplate, editTemplate, deleteTemplate, createPage, createSection, createElement } from '../controllers/templateController.js'

const router = express.Router()

/* Get Template */
router.post('/get', getTemplate);
/* Get / Create Template */
router.route('/')
    .get(getTemplates)
    .post(checkAdmin, createTemplate);
/* Edit Template */
router.patch('/edit', checkAdmin, editTemplate);
/* Delete Template */
router.delete('/delete', checkAdmin, deleteTemplate);
/* Create page, section, element */
router.route('/page')
    .post(checkAdmin, createPage)
    .patch(checkAdmin)
    .delete(checkAdmin)
router.route('/section')
    .post(checkAdmin, createSection)
    .patch(checkAdmin)
    .delete(checkAdmin)
router.route('/element')
    .post(checkAdmin, createElement)
    .patch(checkAdmin)
    .delete(checkAdmin)

export default router