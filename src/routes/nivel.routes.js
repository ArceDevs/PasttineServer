import { Router } from 'express'
import * as modal from '../modal/nivel.modal'
import { valId }  from '../validators/general.validate'
import { valNivel } from '../validators/nivel.validate'

const router = Router()

router.post('/niveles', valId, valNivel, modal.createNivel)

router.put('/niveles/:id', valNivel, modal.updateProductoById)

router.delete('/niveles/:id', valId, modal.deleteNivelById)

router.get('/niveles', modal.getAllNivel)
router.get('/niveles/count', modal.getTotalNivel)
router.get('/niveles/:id', valId, modal.getNivelById)

export default router