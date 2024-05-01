import { Router } from 'express'
import * as modal from '../modal/code.modal'
import { valId }  from '../validators/general.validate'
import * as validation from '../validators/codes.validate'

const router = Router()

router.post('/code', validation.valCodeAdd, modal.createCode)
router.post('/code/email', validation.valCodeAdd, modal.createCodeEmail)
router.post('/code/compare/:id', valId, validation.valCode, modal.getCodeCompare)

router.put('/code/:id', validation.valCodePut, modal.updateCodeById)

router.delete('/code/:id', valId, modal.deleteCodeById)

router.get('/code/:id', valId, modal.getCodeById)
router.get('/code/:email', validation.valEmail, modal.getCodeById)

export default router