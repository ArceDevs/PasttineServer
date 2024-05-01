import { Router } from 'express'
import * as modal from '../modal/products.modal'
import { valId }  from '../validators/general.validate'
import * as validation  from '../validators/products.validate'

const router = Router()

router.post('/products', validation.valProductsAdd, modal.createProducto)

router.put('/products/:id', validation.valProductsPut, modal.getNotFound, modal.updateProductoById)

router.patch('/products/:id', validation.valProductsPatch, modal.getNotFound, modal.patchProductoById)

router.delete('/products/:id', valId, modal.deleteProductoById)

router.get('/products',validation.valProductsGet, async (req, res) => {
  if (Object.keys(req.query).length > 1) {
    modal.getProductoLike(req, res)
  } else {
    modal.getAllProducto(req, res)
  }
})

router.get('/products/count', modal.getTotalProducto)
router.get('/products/:id', valId, modal.getProductoById)
router.get('/products/ingredients/:id', valId, modal.getProductoIngredientesById)
router.get('/products/alergenos/:id', valId, modal.getProductoAlergenosById)
router.get('/products/offers/:id', valId, modal.getProductoOfertasById)

export default router