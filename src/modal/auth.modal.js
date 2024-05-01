if (process.env.NODE_ENV !== 'production') { require('dotenv').config }
import { getConnection, sql, authQueries as queries, datosCompraQueries, carritoQueries } from '../database'
import bcrypt from 'bcryptjs'
import { sendEmail } from '../helpers/email-transporter'
/*** REGISTER ***/

export const registerConfirmation = async (req, res) => {
  const { email } = req.body

  const code = Math.random().toString(36).substr(2, 5).toUpperCase()
  try {
    const mailOptions = {
      from: `Pasttine <${process.env.EMAIL_CONTACTO}>`,
      to: email,
      subject: 'Confirmación de registro Pasttine',
      text: 'Tu codigo de registro es: '+ code
    }
    console.log(mailOptions)
    const enviado = await sendEmail(mailOptions)
    if (enviado) res.status(201).json({ code: code, msg: 'Confirmation email send' })
    else res.status(400).json({ msg: 'An error has occurred on email send' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//INSERT INTO Usuario (Username, Contrasena, Email, UltimoAcceso, UltimaIp)
export const createUsuario = async (req, res) => {
  const { username, contrasena, email, nombre = null, apellido = null } = req.body
  const ultimaIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const hashedPassword = await bcrypt.hash(contrasena, 10)
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('Username', sql.VarChar, username)
      .input('Contrasena', sql.VarChar, hashedPassword)
      .input('Email', sql.VarChar, email)
      .input('UltimaIp', sql.VarChar, ultimaIp)
      .input('Nombre', sql.VarChar, nombre)
      .input('Apellido', sql.VarChar, apellido)
      .query(queries.createUsuario)
 
    await pool.request()
      .input('UsuarioAux', sql.Int, result.recordset[0].Id)
      .query(datosCompraQueries.createDatosCompraUser)
 
    await pool.request()
      .input('UsuarioAux', sql.Int, result.recordset[0].Id)
      .input('Precio', sql.Float, 0)
      .query(carritoQueries.createCarritoUser)

    res.status(201).json({
      status: 'Success',
      msg: `User ${username} created successfully`
    })
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

/*** LOGIN ***/

//SELECT * FROM Usuario WHERE Email = @Email AND Eliminado = 0"
export const getLogin = async (req, res) => {
  const { email, contrasena } = req.body
  let hash = await bcrypt.hash(contrasena, 10)

  bcrypt.compare(password, hash)
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('Email', sql.VarChar, email)
      .input('Contrasena', sql.VarChar, hash)
      .query(queries.getLogin)

    res.status(200).json({ 
      status: 'Success',
      results: result.recordset.length,
      data: result.recordset[0]
    })

  }catch(error){
    res.status(500).json({ error: error.message})
  }

}


export const getUsuarioByEmail = async (email, done) => {
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('Email', sql.VarChar, email)
      .query(queries.getUsuarioByEmail)

    const user = result.recordset[0];
    if (!user) { 
      return done(null, false,'No user with that email') 
    }
    return user

  }catch(error){
    return done(error)
  }

}


export const getUsuarioById = async (id, done) =>  {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getUsuarioById)

    const user = result.recordset[0]
    if (!user) {
      return done(null, false)
    }

    return done(null, user)
  } catch (error) {
    return done(error)
  }
}


//SELECT Auth FROM Usuario WHERE Id = @Id AND NOT Auth IS NULL AND Eliminado = 0
export const getAuthById = async (req, res) =>  {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', req.user.Id)
      .query(queries.getAuthById)

    console.log(result.recordset[0].Auth);
    console.log(req.body.auth);

    if (result.recordset[0].Auth != req.body.auth) {
      console.log('errr');
      return false
    }
    return true
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
}






//UPDATE Usuario SET UltimoAcceso = GETDATE(), SET UltimaIP = @UltimaIP WHERE Id = @Id
export const updateUltimaConexionById = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', req.user.Id)
      .query(queries.getUltimaIPById)

    if(result.recordset.UltimaIP != ip) {
      await pool.request()
        .input('UltimaIP', sql.VarChar, ip)
        .input('Id', req.user.Id)
        .query(queries.updateUltimaConexionById)

      res.status(409).json({
        status: 'Conflict',
        msg: 'User has logged in from another location'
      })
    } else {
      res.status(200).json({
        status: 'Success',
        msg: 'Connection updated'
      })
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}



//UPDATE Usuario SET Auth = Auth WHERE Id = @Id
export const updateAuthById = async (req, res, next) => {
  try{
    const pool = await getConnection()
    await pool.request()
      .input('Auth', req.user.Auth)
      .input('Id', req.user.Id)
      .query(queries.updateAuthById)
    next()
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}



//UPDATE Usuario SET Auth = @Auth WHERE Id = @Id
export const deleteAuthById = async (req, res, next) => {
  const { id } = req.body
  try{
    const pool = await getConnection()
    await pool.request()
      .input('Auth', null)
      .input('Id', sql.Int, id)
      .query(queries.deleteAuthById)
    next()
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

//SELECT * FROM Producto WHERE Id = @Id
export const getConflict = async (req, res, next) => {
  const { email } = req.body
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Email', sql.VarChar, email)
      .query(queries.getConflict)
    if (result.recordset.length > 0) {
      res.status(409).json({ error: 'Record already exists'})
    } else {
      next()
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }

}