import { Router } from 'express'
import * as modal from '../modal/alergenos.modal'
import { valId }  from '../validators/general.validate'
import * as validation  from '../validators/alergenos.validate'

const router = Router()

router.post('/alergenos', validation.valAlergenosAdd, modal.createAlergeno)

router.put('/alergenos/:id', validation.valAlergenosPut, modal.getNotFound, modal.updateAlergenoById)

router.patch('/alergenos/:id', validation.valAlergenosPatch, modal.getNotFound, modal.patchAlergenosById)

router.delete('/alergenos/:id', valId, modal.deleteAlergenoById)

router.get('/alergenos',modal.getAllAlergenos)

router.get('/alergenos/count', modal.getTotalAlergenos)
router.get('/alergenos/:id', valId, modal.getAlergenoById)

export default router