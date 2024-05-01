if (process.env.NODE_ENV !== 'production') { require('dotenv').config }
import { getConnection, sql, errorQueries as queries } from '../database'
import { sendEmail } from '../helpers/email-transporter'

export const sendEmailContacto = async (req, res) => {
  const { id } = req.params
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getContacto)
    
    if (result.recordset.length > 0) {
      const mailOptions = {
        from: `${result.recordset[0].NombreCompleto} <${result.recordset[0].Email}>`,
        to: process.env.EMAIL_CONTACTO,
        subject: result.recordset[0].Asunto,
        text: result.recordset[0].Mensaje
      }
      console.log(mailOptions)
      const enviado = await sendEmail(mailOptions)
      if (enviado) res.status(200).json({ msg: 'Email send' })
      else res.status(400).json({ msg: 'An error has occurred on email send' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE TABLE Error
// (
// Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
// Ruta VARCHAR(100) NOT NULL,
// Metodo VARCHAR(100) NOT NULL,
// Error VARCHAR(MAX) NOT NULL,
// Mensaje VARCHAR(255),
// UsuarioAux INT,
// Navegador VARCHAR(100) NOT NULL,
// IP VARCHAR(39) NOT NULL,
// FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
// )

export const createError = async (req, res) => {
  const { 
    ruta,
    metodo,
    error,
    navegador,
    mensaje = null,
    usuarioAux = null
  } = req.body

  // Obtén la dirección IP del cliente
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Ruta', sql.VarChar, ruta)
      .input('Metodo', sql.VarChar, metodo)
      .input('Error', sql.VarChar, error)
      .input('Mensaje', sql.VarChar, mensaje)
      .input('UsuarioAux', sql.Int, usuarioAux)
      .input('Navegador', sql.VarChar, navegador)
      .input('Ip', sql.VarChar, ip)
      .query(queries.createError)

    if (result.rowsAffected[0] > 0) res.status(201).json({ Id: result.recordset[0].Id, msg: 'Error created successfully' })
    else res.status(406).json({ msg: 'Error not created' })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateError = async (req, res) => {
  const { id } = req.params
  const { 
    ruta,
    metodo,
    error,
    navegador,
    mensaje,
    usuarioAux
  } = req.body

  // Obtén la dirección IP del cliente
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .input('Ruta', sql.VarChar, ruta)
      .input('Metodo', sql.VarChar, metodo)
      .input('Error', sql.VarChar, error)
      .input('Mensaje', sql.VarChar, mensaje)
      .input('UsuarioAux', sql.Int, usuarioAux)
      .input('Navegador', sql.VarChar, navegador)
      .input('Ip', sql.VarChar, ip)
      .query(queries.updateErrorById)
    
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${id} updated` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const patchError = async (req, res) => {
  const { id } = req.params
  const { 
    ruta = null,
    metodo = null,
    error = null,
    navegador = null,
    mensaje = null,
    usuarioAux = null
  } = req.body

  let queryParams = []
  if (mensaje !== null) queryParams.push(`Mensaje = '${mensaje}'`)
  if (ruta !== null) queryParams.push(`Ruta = '${ruta}'`)
  if (metodo !== null) queryParams.push(`Metodo = '${metodo}'`)
  if (error !== null) queryParams.push(`Error = '${error}'`)
  if (usuarioAux !== null) queryParams.push(`UsuarioAux = '${usuarioAux}'`)
  if (navegador !== null) queryParams.push(`Navegador = '${navegador}'`)
  
  if (queryParams.length === 0) return res.status(400).json({ error: 'No changes made' })

  // Obtén la dirección IP del cliente
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  queryParams.push(`Ip = '${ip}'`)

  const queryErrorPatch = `UPDATE Error SET ${queryParams.join(', ')} WHERE Id = @Id`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (mensaje !== null) request.input('Mensaje', sql.VarChar, mensaje)
    if (usuarioAux !== null) request.input('UsuarioAux', sql.Int, usuarioAux)
    if (navegador !== null) request.input('Navegador', sql.VarChar, navegador)
    if (ruta !== null) request.input('Ruta', sql.VarChar, ruta)
    if (metodo !== null) request.input('Metodo', sql.VarChar, metodo)
    if (error !== null) request.input('Error', sql.VarChar, error)

    request.input('Ip', sql.VarChar, ip)
    request.input('Id', sql.Int, id)
    const result = await request.query(queryErrorPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: 'Record updated successfully' })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }

  } catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const deleteError = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.deleteError)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${id} deleted` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
    res.status(200).json({ msg: 'Error deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getError = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getErrorById)
    
    if (result.recordset.length === 0) {
      res.status(204).json({ msg: 'Error not found' })
    } else {
      res.status(200).json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
