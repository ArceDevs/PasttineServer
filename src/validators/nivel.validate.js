import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'



export const valNivel = [
  check('nivel')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Nivel is required')
    .isString().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

