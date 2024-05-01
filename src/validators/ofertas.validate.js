import { check } from 'express-validator';
import { validateResult } from '../helpers/validateHelper';

export const valOfertasAdd = [
  check('tipo')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Tipo is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('descuento')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Descuento is required')
    .isFloat().withMessage('Invalid format'),
  check('productoAux')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('ProductoAux is required')
    .isInt().withMessage('Invalid format'),
  check('video')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 500 }),
  check('banner')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 500 }),
  check('patrocinador')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 500 }),
  check('fechaInicio')
    .optional()
    .isDate().withMessage('Invalid date format'),
  check('fechaFin')
    .optional()
    .isDate().withMessage('Invalid date format'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

export const valOfertasPut = [
  check('tipo')
    .not().isEmpty().withMessage('Tipo is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('descuento')
    .not().isEmpty().withMessage('Descuento is required')
    .isFloat().withMessage('Invalid format'),
  check('productoAux')
    .not().isEmpty().withMessage('ProductoAux is required')
    .isInt().withMessage('Invalid format'),
  check('video')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 500 }),
  check('banner')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 500 }),
  check('patrocinador')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 500 }),
  check('fechaInicio')
    .optional()
    .isDate().withMessage('Invalid date format'),
  check('fechaFin')
    .optional()
    .isDate().withMessage('Invalid date format'),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

export const valOfertasPatch = [
  check('tipo')
    .optional()
    .not().isEmpty().withMessage('Tipo is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 2, max: 50 }).withMessage('Must be between 2 and 50 characters'),
  check('descuento')
    .optional()
    .not().isEmpty().withMessage('Descuento is required')
    .isFloat().withMessage('Invalid format'),
  check('productoAux')
    .optional()
    .not().isEmpty().withMessage('ProductoAux is required')
    .isInt().withMessage('Invalid format'),
  check('video')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 500 }),
  check('banner')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 500 }),
  check('patrocinador')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 500 }),
  check('fechaInicio')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  check('fechaFin')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  check('id')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

export const valOfertasGet = [
  check('page')
    .optional()
    .isInt().withMessage('Invalid format'),
  check('tipo')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 50 }),
  check('descuento')
    .optional()
    .isFloat().withMessage('Invalid format'),
  check('productoAux')
    .optional()
    .isInt().withMessage('Invalid format'),
  check('fechaInicio')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  check('fechaFin')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];
