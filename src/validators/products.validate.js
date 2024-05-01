import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'


export const valProductsAdd = [
  check('nombre')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('precio')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Precio is required')
    .isFloat().withMessage('Invalid format'),
  check('iva')
    .optional()
    .not().isEmpty().withMessage('Iva is required')
    .isFloat().withMessage('Invalid format'),
  check('stock')
    .optional()
    .not().isEmpty().withMessage('Stock is required')
    .isInt().withMessage('Invalid format'),
  check('categoria')
    .optional()
    .not().isEmpty().withMessage('Categoria is required')
    .isInt().withMessage('Invalid format'),
  check('rating')
    .optional()
    .not().isEmpty().withMessage('Rating is required')
    .isInt().withMessage('Invalid format'),  
  check('favorito')
    .optional()
    .isBoolean().withMessage('Invalid format'),
  check('img')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 255 }),
  check('descripcion')
    .optional()
    .isString().withMessage('Invalid format'),
  check('signo')
    .optional()
    .isString().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valProductsPut = [
  check('nombre')
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('precio')
    .not().isEmpty().withMessage('Precio is required')
    .isFloat().withMessage('Invalid format'),
  check('iva')
    .not().isEmpty().withMessage('Iva is required')
    .isFloat().withMessage('Invalid format'),
  check('stock')
    .not().isEmpty().withMessage('Stock is required')
    .isInt().withMessage('Invalid format'),
  check('categoria')
    .not().isEmpty().withMessage('Categoria is required')
    .isInt().withMessage('Invalid format'),
  check('favorito')
    .isBoolean().withMessage('Invalid format'),
  check('rating')
    .not().isEmpty().withMessage('Rating is required')
    .isInt().withMessage('Invalid format'),   
  check('img')
    .isString().withMessage('Invalid format')
    .isLength({ max: 255 }),
  check('descripcion')
    .isString().withMessage('Invalid format'),
  check('signo')
    .not().isEmpty().withMessage('Signo is required')
    .isString().withMessage('Invalid format'),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valProductsPatch = [
  check('nombre')
    .optional()
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('precio')
    .optional()
    .not().isEmpty().withMessage('Precio is required')
    .isFloat().withMessage('Invalid format'),
  check('iva')
    .optional()
    .not().isEmpty().withMessage('Iva is required')
    .isFloat().withMessage('Invalid format'),
  check('stock')
    .optional()
    .not().isEmpty().withMessage('Stock is required')
    .isInt().withMessage('Invalid format'),
  check('categoria')
    .optional()
    .not().isEmpty().withMessage('Categoria is required')
    .isInt().withMessage('Invalid format'),
  check('rating')
    .optional()
    .not().isEmpty().withMessage('Rating is required')
    .isInt().withMessage('Invalid format'), 
  check('favorito')
    .optional()
    .isBoolean().withMessage('Invalid format'),
  check('img')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 255 }),
  check('descripcion')
    .optional()
    .isString().withMessage('Invalid format'),
  check('signo')
    .optional()
    .isString().withMessage('Invalid format'),
  check('id')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]


export const valProductsGet = [
  check('page')
    .optional()
    .isInt().withMessage('Invalid format'),
  check('limit')
    .optional()
    .isInt().withMessage('Invalid format'),
  check('min')
    .optional()
    .custom((min, { req }) => {
      if (min && !req.query.max && Object.keys(req.query).length > 1) {
        throw new Error('Precio maximo is required');
      }
      return true;
    })
    .not().isEmpty().withMessage('Precio minimo is required')
    .isFloat().withMessage('Invalid format'),
  check('max')
    .optional()
    .custom((max, { req }) => {
      if (max && !req.query.min && Object.keys(req.query).length > 1) {
        throw new Error('Precio minimo is required');
      }
      return true;
    })
    .not().isEmpty().withMessage('Precio maximo is required')
    .isFloat().withMessage('Invalid format'),
  check('categoria')
    .optional()
    .not().isEmpty().withMessage('Categoria is required')
    .isInt().withMessage('Invalid format'),
  check('alergenos')
    .optional()
    .not().isEmpty().withMessage('Alergenos is required')
    .isArray().withMessage('Invalid format')
    .custom((alergenos) => {
      alergenos.map(alergeno => {
        if (parseInt(alergeno) === NaN){
          throw new Error('Invalid format')
        }
      })
      return true;
    }),
  check('excluir')
    .optional()
    .not().isEmpty().withMessage('Excluir is required')
    .isBoolean().withMessage('Invalid format'),
  check('ofertas')
    .optional()
    .not().isEmpty().withMessage('Ofertas is required')
    .isBoolean().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
