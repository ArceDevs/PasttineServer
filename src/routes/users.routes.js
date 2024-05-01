import { Router } from 'express'
import * as modal from '../modal/users.modal'
import { valId }  from '../validators/general.validate'
import * as validation  from '../validators/users.validate'

const router = Router()

router.put('/user/:id', validation.valUsuarioDataPatch, modal.getNotFound, modal.updateUsuarioById)
router.patch('/user/upload/pfp/:id',valId, modal.getNotFound, modal.updatePfpById)

router.patch('/user/:id', validation.valUsuarioDataPatch, modal.getNotFound, modal.patchUsuarioById)

router.delete('/user/:id', valId, modal.deleteUsuarioByIdFinal)

router.get('/user/password/confirmation/:id', valId, modal.passwordConfirmation)
router.patch('/user/password/:id',validation.valContrasenaUpdate, modal.getNotFound, modal.updatePassword)

router.patch('/user/password/confirmation/email', validation.valEmail, modal.getNotFoundEmail, modal.passwordConfirmationEmail)
router.post('/user/password/email',validation.valContrasena, validation.valEmail, modal.getNotFoundEmail, modal.updatePasswordEmail)

router.get('/user', modal.getAllUsuario)
router.get('/user/count', modal.getTotalUsuario)
router.get('/user/:id', modal.getUsuarioById)

export default router