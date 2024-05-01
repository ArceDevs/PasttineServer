import { Router } from 'express'
import * as modal from '../modal/purchase.modal'
import { valId }  from '../validators/general.validate'
import * as validation  from '../validators/purchase.validate'

const router = Router()

router.post('/purchase/:user', validation.valPurchaseAdd, modal.createFactura)

router.put('/purchase/:id', validation.valPurchasePut, modal.getNotFound, modal.updateFacturaUser)

router.patch('/purchase/:id', validation.valPurchasePatch, valId, modal.getNotFound, modal.patchFactura)
router.patch('/purchase/user/:id', validation.valPurchasePatch, modal.getNotFoundUser, modal.patchFacturaUser)

router.delete('/purchase/:id', valId, modal.deleteFacturaUser)

router.post('/purchase/end/:id',valId, validation.valPurchaseGet, modal.terminarCompra)


export default router