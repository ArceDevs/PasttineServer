import { Router } from 'express'
import * as modal from '../modal/invoice.modal'
import { valId }  from '../validators/general.validate'
import * as validation  from '../validators/invoice.validate'

const router = Router()

router.post('/invoice/:user', validation.valInvoiceAdd, modal.getNotFoundUser, modal.createDatosCompraUser)

router.put('/invoice/:id', validation.valInvoicePut, modal.getNotFound, modal.updateDatosCompra)
router.put('/invoice/user/:id', validation.valInvoicePut, valId, modal.getNotFound, modal.updateDatosCompraUser)

router.patch('/invoice/:id', validation.valInvoicePatch, modal.getNotFound, modal.patchDatosCompra)
router.patch('/invoice/user/:id', validation.valInvoicePatch, modal.getNotFoundUser, modal.patchDatosCompraUser)

router.delete('/invoice/:id', valId, modal.deleteDatosCompra)

router.get('/invoice/:id', valId, modal.getDatosCompra)
router.get('/invoice/user/:id', valId, modal.getDatosCompraUser)


export default router