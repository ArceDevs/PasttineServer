import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'

export const valCategoriasAdd = [
  check('nombre')
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCategoriasPut = [
  check('nombre')
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCategoriasPatch = [
  check('nombre')
    .optional()
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCategoriasGet = [
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
