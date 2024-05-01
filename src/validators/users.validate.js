import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper'

export const valConfirmation = [
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid format')
    .isLength({ min: 5, max: 100 }).withMessage('Must be between 5 and 50 characters'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valUsuarioDataPut = [
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isInt().withMessage('Invalid format'),
  check('nombre')
    .not().isEmpty().withMessage('Nombre is required')
    .isString().withMessage('Invalid format')
    .isLength({ max: 50 }).withMessage('Must be less than 50 characters'),
  check('apellido')
    .not().isEmpty().withMessage('Apellido is required')
    .isString().withMessage('Invalid format')
    .isLength({ max: 50 }).withMessage('Must be less than 50 characters'),
  check('telefono')
    .not().isEmpty().withMessage('Telefono is required')
    .isNumeric().withMessage('Invalid format'),
  check('fechaNac')
    .not().isEmpty().withMessage('FechaNac is required')
    .isDate().withMessage('Invalid format'),
  check('username')
    .not().isEmpty().withMessage('Username is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 characters'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valUsuarioDataPatch = [
  check('id')
    .not().isEmpty().withMessage('Id is required')
    .isInt().withMessage('Invalid format'),
  check('nombre')
    .optional({ nullable: true })
    .isString().withMessage('Invalid format')
    .isLength({ max: 50 }).withMessage('Must be less than 50 characters'),
  check('apellido')
    .optional({ nullable: true })
    .isString().withMessage('Invalid format')
    .isLength({ max: 50 }).withMessage('Must be less than 50 characters'),
  check('telefono')
    .optional({ nullable: true })
    .isNumeric().withMessage('Invalid format'),
  check('fechaNac')
    .optional({ nullable: true })
    .custom((value, { req }) => {
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
      if (value && !dateRegex.test(value)) {
        throw new Error('Invalid format');
      }
      return true;
    }),
  check('username')
    .optional()
    .not().isEmpty().withMessage('Username is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 characters'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valUsuarioAdd = [
  check('username')
    .not().isEmpty().withMessage('Username is required')
    .isString().withMessage('Invalid format')
    .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 characters'),
  check('contrasena')
    .not().isEmpty().withMessage('Contrasena is required')
    .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 characters'),
  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid format')
    .isLength({ max: 100 }).withMessage('Must be less than 100 characters'),
  check('nombre')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 50 }).withMessage('Must be less than 50 characters'),
  check('apellido')
    .optional()
    .isString().withMessage('Invalid format')
    .isLength({ max: 50 }).withMessage('Must be less than 50 characters'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valUsuarioUpdate = [
  check('email')
    .optional()
    .isEmail().withMessage('Must be email format'),
  check('username')
    .optional()
    .exists().withMessage('Username is required')
    .not().isEmpty()
    .isLength({ min: 5, max: 50 }),
  check('auth')
    .optional()
    .not().isEmpty()
    .isLength({ min: 5, max: 100 }),
  check('contrasena')
    .optional()
    .exists()
    .not().isEmpty()
    .isLength({ min: 5, max: 50 }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valLogin = [
  check('email')
    .exists().withMessage('Email is required')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid format')
    .isLength({ min: 5, max: 100 }).withMessage('Must be between 5 and 50 characters'),
  check('password')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 characters'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valContrasenaUpdate = [
  check('contrasena')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 characters'),
  check('id')
    .exists().withMessage('Required field')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valEmailUpdate = [
  check('email')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid format')
    .isLength({ min: 5, max: 100 }).withMessage('Must be between 5 and 100 characters'),
  check('id')
    .exists().withMessage('Required field')
    .not().isEmpty()
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valAuthUpdate = [
  check('auth')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Auth is required')
    .isLength({ min: 5, max: 100 }).withMessage('Must be between 5 and 50 characters'),
  check('id')
    .exists().withMessage('Required field')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valNivelAuxUpdate = [
  check('nivelAux')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Nivel de usuario is required')
    .isNumeric().withMessage('Invalid format'),
  check('id')
    .exists().withMessage('Required field')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export const valEliminadoUpdate = [
  check('eliminado')
    .exists().withMessage('Required field')
    .not().isEmpty().withMessage('Eliminado is required')
    .isBoolean().withMessage('Invalid format'),
  check('id')
    .exists().withMessage('Required field')
    .isNumeric().withMessage('Invalid format'),
  (req, res, next) => {
    validateResult(req, res, next)
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

export const valContrasena = [
  check('contrasena')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 characters'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]