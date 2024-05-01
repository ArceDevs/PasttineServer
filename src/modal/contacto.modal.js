if (process.env.NODE_ENV !== 'production') { require('dotenv').config }
import { getConnection, sql, contactoQueries as queries } from '../database'
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

export const createContacto = async (req, res) => {
  const { 
    asunto,
    mensaje,
    nombreCompleto,
    email,
    telefono
  } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Asunto', sql.VarChar, asunto)
      .input('Mensaje', sql.VarChar, mensaje)
      .input('NombreCompleto', sql.VarChar, nombreCompleto)
      .input('Email', sql.VarChar, email)
      .input('Telefono', sql.VarChar, telefono)
      .query(queries.createContato)

    if (result.rowsAffected[0] > 0) res.status(201).json({ Id: result.recordset[0].Id, msg: 'Contacto created successfully' })
    else res.status(406).json({ msg: 'Contacto not created' })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateContacto = async (req, res) => {
  const { id } = req.params
  const { 
    asunto,
    mensaje,
    nombreCompleto,
    email,
    telefono
  } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Asunto', sql.VarChar, asunto)
      .input('Mensaje', sql.VarChar, mensaje)
      .input('NombreCompleto', sql.VarChar, nombreCompleto)
      .input('Email', sql.VarChar, email)
      .input('Telefono', sql.VarChar, telefono)
      .input('Id', sql.Int, id)
      .query(queries.updateContacto)
    
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${asunto} updated` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const patchContacto = async (req, res) => {
  const { id } = req.params
  const { 
    asunto = null,
    mensaje = null,
    nombreCompleto = null,
    email = null,
    telefono = null
  } = req.body

  let queryParams = []
  if (asunto !== null) queryParams.push(`Asunto = '${asunto}'` )
  if (mensaje !== null) queryParams.push(`Mensaje = '${mensaje}'` )
  if (nombreCompleto !== null) queryParams.push(`NombreCompleto = '${nombreCompleto}'` )
  if (email !== null) queryParams.push(`Email = '${email}'` )
  if (telefono !== null) queryParams.push(`Telefono = '${telefono}'` )

  if (queryParams.length === 0) return res.status(400).json({ error: 'No changes made' })

  const queryContactosPatch = `UPDATE Contactos SET ${queryParams.join(', ')} WHERE Id = @Id`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (asunto !== null) request.input('Asunto', sql.VarChar, asunto)
    if (mensaje !== null) request.input('Mensaje', sql.VarChar, mensaje)
    if (nombreCompleto !== null) request.input('NombreCompleto', sql.VarChar, nombreCompleto)
    if (email !== null) request.input('Email', sql.VarChar, email)
    if (telefono !== null) request.input('Telefono', sql.VarChar, telefono)

    request.input('Id', sql.Int, id)
    const result = await request.query(queryContactosPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: 'Record updated successfully' })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }

  } catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const deleteContacto = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.deleteContacto)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${id} deleted` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
    res.status(200).json({ msg: 'Contacto deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getContacto = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getContacto)
    
    if (result.recordset.length === 0) {
      res.status(204).json({ msg: 'Contacto not found' })
    } else {
      res.status(200).json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/** MIDDLEWARES**/

//SELECT * FROM Contactos WHERE Id = @Id
export const getNotFound = async (req, res, next) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getContacto)

    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

//SELECT * FROM Contactos WHERE Id = @Id
export const getConflict = async (req, res, next) => {
  const { id } = req.params
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getContacto)
    if (result.recordset.length === 0) {
      res.status(409).json({ error: 'Record already exists'})
    } else {
      next()
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }

}