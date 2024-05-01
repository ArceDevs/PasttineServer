import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'

export const valContactoAdd = [
  check('asunto')
    .not().isEmpty().withMessage('Asunto is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 200 }).withMessage('Must be max 200 characters'),
  check('mensaje')
    .not().isEmpty().withMessage('Mensaje is required')
    .isString().withMessage('Invalid format'),
  check('nombreCompleto')
    .not().isEmpty().withMessage('Nombre completo is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 200 }).withMessage('Must be max 200 characters'),
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('telefono')
    .not().isEmpty().withMessage('Telefono is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 25 }).withMessage('Must be max 25 characters'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valContactoPut = [
  check('asunto')
    .not().isEmpty().withMessage('Asunto is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 200 }).withMessage('Must be max 200 characters'),
  check('mensaje')
    .not().isEmpty().withMessage('Mensaje is required')
    .isString().withMessage('Invalid format'),
  check('nombreCompleto')
    .not().isEmpty().withMessage('Nombre completo is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 200 }).withMessage('Must be max 200 characters'),
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('telefono')
    .not().isEmpty().withMessage('Telefono is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 25 }).withMessage('Must be max 25 characters'),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valContactoPatch = [
  check('asunto')
    .optional()
    .not().isEmpty().withMessage('Asunto is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 200 }).withMessage('Must be max 200 characters'),
  check('mensaje')
    .optional()
    .not().isEmpty().withMessage('Mensaje is required')
    .isString().withMessage('Invalid format'),
  check('nombreCompleto')
    .optional()
    .not().isEmpty().withMessage('Nombre completo is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 200 }).withMessage('Must be max 200 characters'),
  check('email')
    .optional()
    .not().isEmpty().withMessage('Email is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('telefono')
    .optional()
    .not().isEmpty().withMessage('Telefono is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 25 }).withMessage('Must be max 25 characters'),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
