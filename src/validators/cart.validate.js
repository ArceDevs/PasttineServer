import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'

/* CARRITO */

export const valCartAdd = [
  check('usuarioAux')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isNumeric().withMessage('Invalid format'),
  check('precioDetalle')
    .optional()
    .not().isEmpty().withMessage('PrecioDetalle is required')
    .isFloat().withMessage('Invalid format'),
  check('promocion')
    .optional()
    .not().isEmpty().withMessage('Promocion is required')
    .isFloat().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCartPut = [
  check('usuarioAux')
  .not().isEmpty().withMessage('UsuarioAux is required')
  .isNumeric().withMessage('Invalid format'),
  check('precioDetalle')
    .not().isEmpty().withMessage('PrecioDetalle is required')
    .isFloat().withMessage('Invalid format'),
  check('promocion')
    .not().isEmpty().withMessage('Promocion is required')
    .isFloat().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCartPatch = [
  check('id')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  check('usuarioAux')
    .optional()
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  check('precio')
    .optional()
    .not().isEmpty().withMessage('Precio is required')
    .isFloat().withMessage('Invalid format'),
  check('promocion')
    .optional()
    .not().isEmpty().withMessage('Promocion is required')
    .isFloat().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCartGet = [
  check('id')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

/* DETALLES CARRITO */

export const valCartDetailsAdd = [
  check('carritoAux')
    .not().isEmpty().withMessage('CarritoAux is required')
    .isInt().withMessage('Invalid format'),
  check('usuarioAux')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  check('precioDetalle')
    .not().isEmpty().withMessage('PrecioDetalle is required')
    .isFloat().withMessage('Invalid format'),
  check('cantidad')
    .not().isEmpty().withMessage('Promocion is required')
    .isInt().withMessage('Invalid format'),
  check('productoAux')
    .not().isEmpty().withMessage('ProductoAux is required')
    .isInt().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCartDetailsPut = [
  check('carritoAux')
    .not().isEmpty().withMessage('CarritoAux is required')
    .isInt().withMessage('Invalid format'),
  check('precioDetalle')
    .not().isEmpty().withMessage('PrecioDetalle is required')
    .isFloat().withMessage('Invalid format'),
  check('cantidad')
    .not().isEmpty().withMessage('Cantidad is required')
    .isInt().withMessage('Invalid format'),
  check('productoAux')
    .not().isEmpty().withMessage('ProductoAux is required')
    .isInt().withMessage('Invalid format'),
  check('racionComprada')
    .not().isEmpty().withMessage('thio is required')
    .isBoolean().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCartDetailsPatch = [
  check('id')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  check('carritoAux')
    .optional()
    .not().isEmpty().withMessage('CarritoAux is required')
    .isInt().withMessage('Invalid format'),
  check('productoAux')
    .optional()
    .not().isEmpty().withMessage('ProductoAux is required')
    .isInt().withMessage('Invalid format'),
  check('precioProducto')
    .optional()
    .not().isEmpty().withMessage('PrecioProducto is required')
    .isFloat().withMessage('Invalid format'),
  check('cantidad')
    .optional()
    .not().isEmpty().withMessage('Promocion is required')
    .isInt().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCartDetailsGet = [
  check('usuarioAux')
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  check('carritoAux')
    .not().isEmpty().withMessage('CarritoAux is required')
    .isInt().withMessage('Invalid format'),
  check('productoAux')
    .not().isEmpty().withMessage('ProductoAux is required')
    .isInt().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valCartDetailsUserFullPut = [
  check('usuarioAux')
  .not().isEmpty().withMessage('UsuarioAux is required')
  .isNumeric().withMessage('Invalid format'),
  check('precioDetalle')
    .not().isEmpty().withMessage('PrecioDetalle is required')
    .isFloat().withMessage('Invalid format'),
  check('promocion')
    .not().isEmpty().withMessage('Promocion is required')
    .isFloat().withMessage('Invalid format'),
  check('detalles')
    .not().isEmpty().withMessage('Detalles is required')
    .isArray().withMessage('Invalid format')
    .custom((value, { req }) => {
      console.log(value)
      value.forEach(element => {
        if (!element.carritoAux) {
          throw new Error('CarritoAux is required')
        }
        if (!element.precioProducto) {
          throw new Error('PrecioProducto is required')
        }
        if (!element.cantidad) {
          throw new Error('Cantidad is required')
        }
        if (!element.productoAux) {
          throw new Error('ProductoAux is required')
        }
      })
      return true
    }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]