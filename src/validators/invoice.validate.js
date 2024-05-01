import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'

export const valInvoiceAdd = [
  check('usuarioAux')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isNumeric().withMessage('Invalid format'),
  check('provincia')
    .optional()
    .not().isEmpty().withMessage('Provincia is required')
    .isString().withMessage('Invalid format'),
  check('direccion')
    .optional()
    .not().isEmpty().withMessage('Direccion is required')
    .isString().withMessage('Invalid format'),
  check('direccion2')
    .optional()
    .not().isEmpty().withMessage('Direccion2 is required')
    .isString().withMessage('Invalid format'),
  check('cp')
    .optional()
    .not().isEmpty().withMessage('Cp is required')
    .isInt().withMessage('Invalid format'),
  check('telefono')
    .optional()
    .not().isEmpty().withMessage('Telefono is required')
    .isString().withMessage('Invalid format'),
  check('recordar')
    .optional()
    .not().isEmpty().withMessage('Recordar is required')
    .isBoolean().withMessage('Invalid format'),
  check('facturaAux')
    .optional()
    .not().isEmpty().withMessage('FacturaAux is required')
    .isString().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valInvoicePut = [
  check('usuarioAux')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isNumeric().withMessage('Invalid format'),
  check('provincia')
    .not().isEmpty().withMessage('Provincia is required')
    .isString().withMessage('Invalid format'),
  check('direccion')
    .not().isEmpty().withMessage('Direccion is required')
    .isString().withMessage('Invalid format'),
  check('direccion2')
    .not().isEmpty().withMessage('Direccion2 is required')
    .isString().withMessage('Invalid format'),
  check('cp')
    .not().isEmpty().withMessage('Cp is required')
    .isInt().withMessage('Invalid format'),
  check('telefono')
    .not().isEmpty().withMessage('Telefono is required')
    .isString().withMessage('Invalid format'),
  check('recordar')
    .not().isEmpty().withMessage('Recordar is required')
    .isBoolean().withMessage('Invalid format'),
  check('facturaAux')
    .not().isEmpty().withMessage('FacturaAux is required')
    .isString().withMessage('Invalid format'),
  check('id')
    .optional()
    .not().isEmpty().withMessage('Id is required')
    .isInt().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valInvoicePatch = [
  check('usuarioAux')
    .optional()
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isNumeric().withMessage('Invalid format'),
  check('provincia')
    .optional()
    .not().isEmpty().withMessage('Provincia is required')
    .isString().withMessage('Invalid format'),
  check('direccion')
    .optional()
    .not().isEmpty().withMessage('Direccion is required')
    .isString().withMessage('Invalid format'),
  check('direccion2')
    .optional()
    .not().isEmpty().withMessage('Direccion2 is required')
    .isString().withMessage('Invalid format'),
  check('cp')
    .optional()
    .not().isEmpty().withMessage('Cp is required')
    .isInt().withMessage('Invalid format'),
  check('telefono')
    .optional()
    .not().isEmpty().withMessage('Telefono is required')
    .isString().withMessage('Invalid format'),
  check('recordar')
    .optional()
    .not().isEmpty().withMessage('Recordar is required')
    .isBoolean().withMessage('Invalid format'),
  check('facturaAux')
    .optional()
    .not().isEmpty().withMessage('FacturaAux is required')
    .isString().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valInvoiceGet = [
  check('id')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
