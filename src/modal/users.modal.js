if (process.env.NODE_ENV !== 'production') { require('dotenv').config }
import { getConnection, sql, usuarioQueries as queries } from '../database'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import path from 'path'
import { sendEmail } from '../helpers/email-transporter'

export const passwordConfirmation = async (req, res) => {
  const { id } = req.params

  const code = Math.random().toString(36).substr(2, 5).toUpperCase()
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getUsuarioById)
    if (result.recordset.length === 0) return res.status(404).json({ error: 'Record does not exists'})

    const mailOptions = {
      from: `Pasttine <${process.env.EMAIL_CONTACTO}>`,
      to: result.recordset[0].Email,
      subject: 'Confirmación de cambio de contraseña Pasttine',
      text: 'Tu codigo de registro es: '+ code
    }
    console.log(mailOptions)
    const enviado = await sendEmail(mailOptions)
    if (enviado) res.status(200).json({ code: code, msg: 'Confirmation email send' })
    else res.status(400).json({ msg: 'An error has occurred on email send' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const passwordConfirmationEmail = async (req, res) => {
  const { email } = req.body

  const code = Math.random().toString(36).substr(2, 5).toUpperCase()
  try {
    const mailOptions = {
      from: `Pasttine <${process.env.EMAIL_CONTACTO}>`,
      to: email,
      subject: 'Confirmación de cambio de contraseña Pasttine',
      text: 'Tu codigo de registro es: '+ code
    }
    console.log(mailOptions)
    const enviado = await sendEmail(mailOptions)
    if (enviado) res.status(200).json({ code: code, msg: 'Confirmation email send' })
    else res.status(400).json({ msg: 'An error has occurred on email send' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updatePassword = async (req, res) => {
  const { id } = req.params
  const { contrasena } = req.body
  const hashedPassword = await bcrypt.hash(contrasena, 10)
  try{
    const pool = await getConnection()
    await pool.request()
      .input('Contrasena', sql.VarChar, hashedPassword)
      .input('Id', sql.Int, id)
      .query(queries.updatePasswordById)
 
    res.status(204).json({
      status: 'Success',
      msg: `User ${id} updated`
    })
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const updatePasswordEmail = async (req, res) => {
  const { contrasena, email } = req.body
  const hashedPassword = await bcrypt.hash(contrasena, 10)
  try{
    const pool = await getConnection()
    await pool.request()
      .input('Contrasena', sql.VarChar, hashedPassword)
      .input('Email', sql.VarChar, email)
      .query(queries.updatePasswordEmail)
 
    res.status(204).json({
      status: 'Success',
      msg: `User ${email} updated`
    })
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagePath = path.join(__dirname, '..', 'media', 'images', 'users');
    cb(null, imagePath)
  },
  filename: (req, file, cb) => {
    const Id = req.params.id;
    const filename = `${Id}-${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000 * 1024 }, // Set a limit of 100KB
});

/*** UPDATE ***/
export const updateUsuarioById = async (req, res) => {
  const { id } = req.params
  let { 
    username, 
    nombre = null,
    apellido = null, 
    telefono = null, 
    fechaNac = null
  } = req.body

  try {
    const pool = await getConnection()
    const request = pool.request()
      .input('Username', sql.VarChar, username)
      .input('Nombre', sql.VarChar, nombre)
      .input('Apellido', sql.VarChar, apellido)
      .input('Telefono', sql.Int, telefono)
      .input('FechaNac', sql.Date, fechaNac)
      .input('Id', sql.Int, id)

    await request.query(queries.updateUsuarioDataById)

    res.status(204).json({ msg: 'Record updated successfully' })
  } catch(error) {
    res.status(500).json({ error: error.message})
  }
}

export const updatePfpById = async (req, res) => {
  upload.single('pfp')(req, res, async (err) => {
    if (err) return res.status(500).json({ error: err.message })
    if (!req.file) return res.status(400).json({ msg: 'PFP is required' })
    if (req.file.size > 1000 * 1024) return res.status(400).json({ error: 'Must be less than 100KB' })

    const { id } = req.params

    try {
      const pool = await getConnection()
      const request = pool.request()
        .input('PFP', sql.VarChar, `media/images/users/${id}-${req.file.originalname}`)
        .input('Id', sql.Int, id)
      await request.query(queries.updatePfpById)

      res.status(204).json({ msg: 'Record updated successfully' })
    } catch(error) {
      res.status(500).json({ error: error.message})
    }
  })
}


/*** PATCH ***/

export const patchUsuarioById = async (req, res) => {
  const { id } = req.params
  let { 
    username, nombre, apellido, telefono, fechaNac
  } = req.body

  let queryParams = []
  if (username !== null) queryParams.push('Username = @Username')
  if (nombre !== null) queryParams.push('Nombre = @Nombre')
  if (apellido !== null) queryParams.push('Apellido = @Apellido')
  if (telefono !== null) queryParams.push('Telefono = @Telefono')
  if (fechaNac !== null) queryParams.push('FechaNac = @FechaNac')
  if (req.file) queryParams.push('PFP = @PFP')

  if (queryParams.length === 0) return res.status(400).json({ error: 'No changes made' })

  const queryProductoPatch = `UPDATE Usuario SET ${queryParams.join(', ')} WHERE Id = @Id`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (nombre !== null) request.input('Nombre', sql.VarChar, nombre)
    if (apellido !== null) request.input('Apellido', sql.VarChar, apellido)
    if (telefono !== null) request.input('Telefono', sql.Int, telefono)
    if (fechaNac !== null) request.input('FechaNac', sql.Date, fechaNac)
    if (req.file) request.input('PFP', sql.VarChar, req.file.filename)
    if (username !== null) request.input('Username', sql.VarChar, username)

    request.input('Id', sql.Int, id)
    const result = await request.query(queryProductoPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: 'Record updated successfully' })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

/*** DELETE ***/

//UPDATE Usuario SET Eliminado = @Eliminado WHERE Id = @Id
export const deleteUsuarioById = async (req, res) => {
  const { id } = req.params
  const { eliminado } = req.body


  try{
    const pool = await getConnection()
    await pool.request()
      .input('Eliminado', sql.Bit, eliminado)
      .input('Id', id)
      .query(queries.deleteUsuarioById)

    res.status(200)
  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}

//DELETE FROM Usuario WHERE Id = @Id
export const deleteUsuarioByIdFinal = async (req, res) => {
  const { id } = req.params

  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('id', id)
      .query(queries.deleteUsuarioByIdFinal)

    res.sendStatus(204)
  }catch(error){
    res.status(500)
    res.send(error.message)
  }

}



/*** SELECT ***/
//Id, Username, Contrasena, Email, Auth, Nivel, Nombre, Apellido, Telefono, FechaNac, PFP

//SELECT *, NOT Contrasena FROM Usuario WHERE (Username = @Username OR Email = @Email) AND Contrasena = @Contrasena AND Auth = @Auth AND Eliminado = 0
export const getLogin = async (req, res) => {
  const { username, email, contrasena, auth } = req.body
  let hash = await bcrypt.hash(contrasena, 8)

  bcrypt.compare(password, hash)
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('Username', sql.VarChar, username)
      .input('Email', sql.VarChar, email)
      .input('Contrasena', sql.VarChar, hash)
      .input('Auth', sql.VarChar, auth)
      .query(queries.getLogin)

    res.send(result.recordset[0])

  }catch(error){
    res.status(500)
    res.send(error.message)
  }

}

//SELECT * FROM Usuario
export const getAllUsuario = async (req, res) => {
  try{
    const pool = await getConnection()
    const result = await pool.request().query(queries.getAllUsuario)
    res.json(result.recordset)
  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}

export const getUsuarioById = async (req, res) => {
  const { id } = req.params

  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int,id)
      .query(queries.getUsuarioById)

    res.send(result.recordset[0])

  }catch(error){
    res.status(500)
    res.send(error.message)
  }

}



//SELECT COUNT(*) FROM Usuario
export const getTotalUsuario = async (req, res) => {
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .query(queries.getTotalUsuario)

    res.json(result.recordset[0][''])

  }catch(error){
    res.status(500)
    res.send(error.message)
  }

}

/** MIDDLEWARES**/
export const getNotFound = async (req, res, next) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getUsuarioById)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const getNotFoundEmail = async (req, res, next) => {
  const { email } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Email', sql.VarChar, email)
      .query(queries.getUsuarioEmail)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}