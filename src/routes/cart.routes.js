import { Router } from 'express'
import * as modal from '../modal/cart.modal'
import { valId }  from '../validators/general.validate'
import * as validation  from '../validators/cart.validate'

const router = Router()

router.post('/cart', validation.valCartAdd, modal.getConflictCarrito, modal.createCarrito)
router.post('/cart/details', validation.valCartDetailsAdd, modal.getConflictDetalles, modal.createDetails)

router.put('/cart/:id', validation.valCartPut, modal.getNotFoundCarrito, modal.updateCarrito)
router.put('/cart/details/:id', validation.valCartDetailsPut, modal.getNotFoundDetalles, modal.updateDetailsById)
router.put('/cart/details/user/:id', validation.valCartDetailsPut, modal.getNotFoundCarrito, modal.updateCarritoAndDetallesUser)

router.patch('/cart/:id', validation.valCartPatch, modal.getNotFoundCarrito, modal.patchCarrito)
router.patch('/cart/details/:id', validation.valCartDetailsPatch, modal.patchDetail)
router.patch('/cart/user/:id', validation.valCartPatch, modal.patchCarritoUser)

router.delete('/cart/:id', valId, modal.deleteCarrito)
router.delete('/cart/details/:id', valId, modal.deleteDetails)
router.delete('/cart/details/cart/:id', valId, modal.deleteDetailsByCart)

router.get('/cart/:id',validation.valCartGet, modal.getCarritoById)
router.get('/cart/details/:id', valId, modal.getDetallesById)

router.get('/cart/user/:id',valId, modal.getCarritoUser)
router.get('/cart/details/user/:id', valId, modal.getDetallesUser)

router.get('/cart/details/cartAux/:id', valId, modal.getDetallesUser)

router.get('/cart/full/user/:id', valId, modal.getCartFullUser)
router.get('/cart/check/user/:id', valId, modal.checkCart)

export default router