import { Router } from 'express'
import * as modal from '../modal/error.modal'
import { valId }  from '../validators/general.validate'
import * as validation  from '../validators/error.validate'

const router = Router()

router.post('/error', validation.valErrorAdd, modal.createError)

router.put('/error/:id', validation.valErrorPut, modal.updateError)

router.patch('/error/:id', validation.valErrorPatch, modal.patchError)

router.delete('/error/:id', valId, modal.deleteError)

router.get('/error/:id', valId, modal.getError)

export default router