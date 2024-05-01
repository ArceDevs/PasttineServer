import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'



export const valId = [
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

