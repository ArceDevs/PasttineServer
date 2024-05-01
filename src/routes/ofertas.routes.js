import { Router } from 'express'
import * as modal from '../modal/ofertas.modal'
import { valId }  from '../validators/general.validate'
import * as validation from '../validators/ofertas.validate'

const router = Router()

router.post('/ofertas', valId, validation.valOfertasAdd, modal.createOferta)

router.put('/ofertas/:id', validation.valOfertasPut, modal.updateOfertaById)

router.delete('/ofertas/:id', valId, modal.deleteOfertaById)

router.get('/ofertas', modal.getAllOfertas)
router.get('/ofertas/banner', modal.getOfertasBanner)
router.get('/ofertas/count', modal.getTotalOfertas)
router.get('/ofertas/:id', valId, modal.getOfertaById)

export default router