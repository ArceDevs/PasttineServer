if (process.env.NODE_ENV !== 'production') { require('dotenv').config }
import { createUsuario, getUsuarioByEmail, getUsuarioById, updateUltimaConexionById, getAuthById, updateAuthById, deleteAuthById, registerConfirmation, getConflict } from '../modal/auth.modal'
import  * as validation  from '../validators/users.validate'
import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

const router = Router()

const initializePassword = require('../helpers/passport-config')
initializePassword(passport, getUsuarioByEmail, getUsuarioById)

router.get('/auth/login', checkAuthenticated)

router.post('/token'), (req, res) => {
  const refreshToken = req.body.token

  if (refreshToken === null) return res.status(401).json({
    status: 'Unauthorized',
    msg: 'Access denied'
  })
  if (!getAuthById(req, res)) return res.status(403).json({
    status: 'Forbidden',
    msg: 'Access denied'
  })

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, req) => {
    if (err) return res.status(403).json({
      status: 'Forbidden',
      msg: 'Access denied'
    })

    res.status(200).json({
      status: 'Success',
      msg: 'User authenticated',
      
    })
  })
}


//In case another user is already authenticated he can't log in again
router.post('/auth/login', validation.valLogin, checkNotAuthenticated, passport.authenticate('local'), (req, res, next) => {

  const refreshToken = jwt.sign(req.user.Email, process.env.REFRESH_TOKEN_SECRET)
  req.user.Auth = refreshToken
  updateAuthById(req, res, next)

  const userFront = {
    Id: req.user.Id,
    Username: req.user.Username,
    Email: req.user.Email,
    Auth: req.user.Auth,
    NivelAux: req.user.NivelAux,
    Nombre: req.user.Nombre,
    Apellido: req.user.Apellido,
    Telefono: req.user.Telefono,
    FechaNac: req.user.FechaNac,
    PFP: req.user.PFP
  }

  res.status(200).json({
    status: 'Success',
    msg: 'User logged in successfully',
    data: userFront
  })
})


router.get('/auth/connection', checkConnection, updateUltimaConexionById)

//Register user
router.post('/auth/register/confirmation', checkNotAuthenticated, validation.valConfirmation, getConflict, registerConfirmation)
router.post('/auth/register', checkNotAuthenticated, validation.valUsuarioAdd, getConflict, createUsuario)

router.delete('/auth/logout', authenticateRefreshToken, (req, res, next) => {
  if (req.isAuthenticated()){
    deleteAuthById(req, res, next)
    return req.logOut(() => {
      res.status(200).json({
        status: 'Success',
        msg: 'User has logged off'
      })
    })
  } else {
    res.status(401).json({ 
      status: 'Unauthorized',
      msg: 'User is not logged in'
    })
  }

  
})

function checkConnection(req, res, next){
  if (req.isAuthenticated()){
    return next()
  }
  res.status(401).send({
    status: 'Unauthorized',
    msg: 'User is not logged in'
  })
  
}
function checkAuthenticated(req, res){

  if (req.isAuthenticated()){
    return res.status(409).json({ 
      status: 'Conflict',
      msg: 'User is already logged in'
    })
  }
  
  res.status(404).json({ 
    status: 'Not found',
    msg: 'Failed to log in'
  })
  
}


function checkNotAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return res.status(409).send({
      status: 'Conflict',
      msg: 'User is already logged in'
    })
  }
  next()
}

function generateAccessToken() {
  return jwt.sign(process.env.API_KEY_PSW, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3s' })
}

function authenticateRefreshToken(err, req, res, next) {
  const refreshToken = req.body.auth
  if (refreshToken === null) return res.status(401).json({
    status: 'Unauthorized',
    msg: 'Access denied'
  })

  if (!getAuthById(req, res)) return res.status(403).json({
    status: 'Forbidden',
    msg: 'Access denied'
  })
  jwt.verify(req.body.email, process.env.REFRESH_TOKEN_SECRET, (err, req, res, next) => {
    if (err) return res.status(403).json({
      status: 'Forbidden',
      msg: 'Access denied'
    })
  })
}


// //Checks if request nows API KEY
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token === null) return res.status(401).json({
//     status: 'Unauthorized',
//     msg: 'Access denied'
//   })

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(403).json({
//       status: 'Forbidden',
//       msg: 'Access denied'
//     })
//     next()
//   })
// }



export default router