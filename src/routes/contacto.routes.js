import { Router } from 'express'
import * as modal from '../modal/contacto.modal'
import { valId }  from '../validators/general.validate'
import * as validation  from '../validators/contacto.validate'

const router = Router()

router.post('/contact', validation.valContactoAdd, modal.createContacto)

router.put('/contact/:id', validation.valContactoPut, modal.getNotFound, modal.updateContacto)

router.patch('/contact/:id', validation.valContactoPatch, modal.getNotFound, modal.patchContacto)

router.delete('/contact/:id', valId, modal.deleteContacto)

router.get('/contact/:id', valId, modal.getContacto)

router.get('/send-email/:id', valId, modal.getNotFound, modal.sendEmailContacto)


export default router