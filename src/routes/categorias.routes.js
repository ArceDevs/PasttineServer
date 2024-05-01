import { Router } from 'express'
import * as modal from '../modal/categorias.modal'
import { valId }  from '../validators/general.validate'
import * as validation  from '../validators/categorias.validate'

const router = Router()

router.post('/categorias', validation.valCategoriasAdd, modal.createCategorias)

router.put('/categorias/:id', validation.valCategoriasPut, modal.getNotFound, modal.updateCategoriasById)

router.patch('/categorias/:id', validation.valCategoriasPatch, modal.getNotFound, modal.patchCategoriasById)

router.delete('/categorias/:id', valId, modal.deleteCategoriasById)

router.get('/categorias',modal.getAllCategorias)

router.get('/categorias/count', modal.getTotalCategorias)
router.get('/categorias/:id', valId, modal.getCategoriasById)

export default router