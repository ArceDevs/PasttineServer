import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'

// CREATE TABLE Factura
// (
// UsuarioAux INT NOT NULL,
// Precio FLOAT NOT NULL,
// Promocion FLOAT DEFAULT 0,
// FechaCompra DATETIME2,
// Estado VARCHAR(50) DEFAULT 'Pendiente',
// )

/* FACTURA */
export const valPurchaseAdd = [
  check('user')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valPurchasePut = [
  check('usuarioAux')
  .not().isEmpty().withMessage('UsuarioAux is required')
  .isNumeric().withMessage('Invalid format'),
  check('precio')
    .not().isEmpty().withMessage('PrecioDetalle is required')
    .isFloat().withMessage('Invalid format'),
  check('promocion')
    .not().isEmpty().withMessage('Promocion is required')
    .isFloat().withMessage('Invalid format'),
  check('estado')
    .not().isEmpty().withMessage('Estado is required')
    .isString().withMessage('Invalid format'),
  check('fechaCompra')
    .not().isEmpty().withMessage('FechaCompra is required')
    .isDate().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valPurchasePatch = [
  check('usuarioAux')
    .optional()
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isNumeric().withMessage('Invalid format'),
  check('precio')
    .optional()
    .not().isEmpty().withMessage('PrecioDetalle is required')
    .isFloat().withMessage('Invalid format'),
  check('promocion')
    .optional()
    .not().isEmpty().withMessage('Promocion is required')
    .isFloat().withMessage('Invalid format'),
  check('estado')
    .optional()
    .not().isEmpty().withMessage('Estado is required')
    .isString().withMessage('Invalid format'),
  check('fechaCompra')
    .optional()
    .not().isEmpty().withMessage('FechaCompra is required')
    .isDate().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valPurchaseGet = [
  check('usuarioAux')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
