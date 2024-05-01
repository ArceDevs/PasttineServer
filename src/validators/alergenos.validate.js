import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'

export const valAlergenosAdd = [
  check('nombre')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('img')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 255 }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valAlergenosPut = [
  check('nombre')
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('img')
    .not().isEmpty().withMessage('Img is required')
    .isString().withMessage('Invalid format')
    .isLength({ max: 255 }),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valAlergenosPatch = [
  check('nombre')
    .optional()
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('img')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 255 }),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valAlergenosGet = [
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
