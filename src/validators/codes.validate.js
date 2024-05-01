import { check } from 'express-validator';
import { validateResult } from '../helpers/validateHelper';

export const valCodeAdd = [
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid format'),
  check('usuarioAux')
    .optional()
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

export const valCodePut = [
  check('codigo')
    .not().isEmpty().withMessage('Codigo is required')
    .isString().withMessage('Invalid format')
    .matches(/^[a-zA-Z0-9]{5}$/, 'i').withMessage('Must be exactly 5 alphanumeric characters'),
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid format'),
  check('usuarioAux')
    .optional()
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

export const valCodePatch = [
  check('codigo')
    .optional()
    .not().isEmpty().withMessage('Codigo is required')
    .isString().withMessage('Invalid format')
    .matches(/^[a-zA-Z0-9]{5}$/, 'i').withMessage('Must be exactly 5 alphanumeric characters'),
  check('email')
    .optional()
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid format'),
  check('usuarioAux')
    .optional()
    .not().isEmpty().withMessage('UsuarioAux is required')
    .isInt().withMessage('Invalid format'),
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

export const valCode = [
  check('codigo')
    .optional()
    .not().isEmpty().withMessage('Codigo is required')
    .isString().withMessage('Invalid format')
    .matches(/^[a-zA-Z0-9]{5}$/, 'i').withMessage('Must be exactly 5 alphanumeric characters'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

export const valEmail = [
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
