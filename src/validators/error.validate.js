import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'

export const valErrorAdd = [
  check('ruta')
    .not().isEmpty().withMessage('Ruta is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('metodo')
    .not().isEmpty().withMessage('Metodo is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('navegador')
    .not().isEmpty().withMessage('Navegador is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('error')
    .not().isEmpty().withMessage('Error is required')
    .isString().withMessage('Invalid format'),
  check('mensaje')
    .optional()
    .not().isEmpty().withMessage('Mensaje is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 255 }).withMessage('Must be max 255 characters'),
  check('usuarioAux')
    .optional()
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valErrorPut = [
  check('ruta')
    .not().isEmpty().withMessage('Ruta is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('metodo')
    .not().isEmpty().withMessage('Metodo is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('navegador')
    .not().isEmpty().withMessage('Navegador is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('error')
    .not().isEmpty().withMessage('Error is required')
    .isString().withMessage('Invalid format'),
  check('mensaje')
    .not().isEmpty().withMessage('Mensaje is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 255 }).withMessage('Must be max 255 characters'),
  check('usuarioAux')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valErrorPatch = [
  check('ruta')
    .optional()
    .not().isEmpty().withMessage('Ruta is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('metodo')
    .optional()
    .not().isEmpty().withMessage('Metodo is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('navegador')
    .optional()
    .not().isEmpty().withMessage('Navegador is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 100 }).withMessage('Must be max 100 characters'),
  check('error')
    .optional()
    .not().isEmpty().withMessage('Error is required')
    .isString().withMessage('Invalid format'),
  check('mensaje')
    .optional()
    .not().isEmpty().withMessage('Mensaje is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 0, max: 255 }).withMessage('Must be max 255 characters'),
  check('usuarioAux')
    .optional()
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
