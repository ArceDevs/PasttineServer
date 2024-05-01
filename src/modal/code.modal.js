import { getConnection, sql, codesQueries as queries } from '../database'
import { sendEmail } from '../helpers/email-transporter'

export const passwordConfirmation = async (req, res) => {
  const { id } = req.params

  const code = Math.random().toString(36).substr(2, 5).toUpperCase()
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('IdCodigo', sql.Int, id)
      .query(queries.getCodeById)
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

/*** INSERT ***/
export const createCode = async (req, res) => {
  const { email } = req.body

  const code = Math.random().toString(36).substr(2, 5).toUpperCase()

  try {
    const pool = await getConnection()

    const user = await pool.request()
      .input('Email', sql.VarChar, email)
      .query("SELECT Id, Email FROM Usuario WHERE Email = @Email")

    if (user.recordset.length === 0) return res.status(404).json({ error: 'User does not exists'})

    const result = await pool.request()
      .input('UsuarioAux', sql.Int, user.recordset[0].Id)
      .input('Email', sql.VarChar, user.recordset[0].Email)
      .input('Codigo', sql.VarChar, code)
      .input('NumIntentos', sql.Int, 1)
      .input('TotalIntentos', sql.Int, 1)
      .query(queries.createCode)

    res.status(200).json({ Id: result.recordset[0].Id })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const createCodeEmail = async (req, res) => {
  const { email } = req.body

  const code = Math.random().toString(36).substr(2, 5).toUpperCase()
  try {
    const pool = await getConnection()

    const codeExists = await pool.request()
      .input('Email', sql.VarChar, email)
      .query("SELECT IdCodigo FROM ConfirmacionCodigo WHERE Email = @Email")

    if (codeExists.recordset.length !== 0) {
      await pool.request()
        .input('Codigo', sql.VarChar, code)
        .input('IdCodigo', sql.Int, codeExists.recordset[0].IdCodigo)
        .query("UPDATE ConfirmacionCodigo SET Codigo = @Codigo, NumIntentos = NumIntentos+1, TotalIntentos = TotalIntentos+1 WHERE IdCodigo = @IdCodigo")
    
        const mailOptions = {
          from: `Pasttine <${process.env.EMAIL_CONTACTO}>`,
          to: email,
          subject: 'Confirmación de cambio de contraseña Pasttine',
          text: 'Tu codigo de registro es: '+ code
        }
        const enviado = await sendEmail(mailOptions)
        if (enviado) return res.status(200).json({ Id: codeExists.recordset[0].IdCodigo, msg: 'Confirmation email send' }) 
        else res.status(400).json({ msg: 'An error has occurred on email send' })
    }

    const user = await pool.request()
      .input('Email', sql.VarChar, email)
      .query("SELECT Id, Email FROM Usuario WHERE Email = @Email")

    if (user.recordset.length === 0) return res.status(404).json({ error: 'User does not exists'})

    const result = await pool.request()
      .input('UsuarioAux', sql.Int, user.recordset[0].Id)
      .input('Email', sql.VarChar, user.recordset[0].Email)
      .input('Codigo', sql.VarChar, code)
      .input('NumIntentos', sql.Int, 1)
      .input('TotalIntentos', sql.Int, 1)
      .query(queries.createCode)

      const mailOptions = {
        from: `Pasttine <${process.env.EMAIL_CONTACTO}>`,
        to: email,
        subject: 'Confirmación de cambio de contraseña Pasttine',
        text: 'Tu codigo de registro es: '+ code
      }
      const enviado = await sendEmail(mailOptions)
      if (enviado) return res.status(201).json({ Id: result.recordset[0].IdCodigo, msg: 'Confirmation email send' }) 
      else res.status(400).json({ msg: 'An error has occurred on email send' })
  } catch (error) {
    res.status(500).send(error.message)
  }
}


/*** UPDATE ***/
export const updateCodeById = async (req, res) => {
  const { id } = req.params
  const { 
    usuarioAux = null,
    email = null,
    codigo = null
  } = req.body

  try {
    const pool = await getConnection()
    await pool.request()
      .input('UsuarioAux', sql.Int, usuarioAux)
      .input('Email', sql.VarChar, email)
      .input('Codigo', sql.VarChar, codigo)
      .input('IdCodigo', sql.Int, id)
      .query(queries.updateCodeById)

    res.status(204).send('Code updated successfully')
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const patchCodeById = async (req, res) => {
  const { id } = req.params
  const { 
    usuarioAux = null,
    email = null,
    codigo = null
  } = req.body

  let queryParams = []
  if (usuarioAux !== null) queryParams.push(`UsuarioAux = '${usuarioAux}'` )
  if (email !== null) queryParams.push(`Email = '${email}'` )
  if (codigo !== null) queryParams.push(`Codigo = '${codigo}'` )

  if (queryParams.length === 0) return res.status(400).json({ error: 'No changes made' })

  const queryCodesPatch = 
  `UPDATE ConfirmacionCodigo SET 
  TotalIntentos = TotalIntentos +1, 
  FechaIntento = GETDATE(),
  ${queryParams.join(', ')} 
  WHERE IdCodigo = @IdCodigo`

  try {
    const pool = await getConnection()
    await pool.request()
      .input('UsuarioAux', sql.Int, usuarioAux)
      .input('Email', sql.VarChar, email)
      .input('Codigo', sql.VarChar, codigo)
      .input('IdCodigo', sql.Int, id)
      .query(queryCodesPatch)

    res.status(204).send('Code updated successfully')
  } catch (error) {
    res.status(500).send(error.message)
  }
}

/*** DELETE ***/

export const deleteCodeById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    await pool.request()
      .input('IdCodigo', sql.Int, id)
      .query(queries.deleteCodeById)

    res.sendStatus(204)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

/*** SELECT ***/
export const getCodeById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('IdCodigo', sql.Int, id)
      .query(queries.getCodeById)

    if (result.recordset.length === 0) {
      res.status(404).send('Code not found')
    } else {
      res.json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getCodeEmail = async (req, res) => {
  var { email } = req.params
  email = decodeURIComponent(email)

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Email', sql.VarChar, email)
      .query(queries.getCodeEmail)

    if (result.recordset.length === 0) {
      res.status(404).send('Code not found')
    } else {
      resstatus(200).json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getCodeCompare = async (req, res) => {
  const { id } = req.params
  const { codigo } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('IdCodigo', sql.Int, id)
      .query(queries.getCodeById)

    if (result.recordset.length === 0) {
      res.status(404).send('Code not found')
    } else if (result.recordset[0].Codigo !== codigo) {
      if (result.recordset[0].NumIntentos > 5) {
        await pool.request()
          .input('IdCodigo', sql.Int, id)
          .query("UPDATE ConfirmacionCodigo SET Codigo = '', NumIntentos = 0  WHERE IdCodigo = @IdCodigo")
        res.status(400).send('You have exceeded the number of attempts')
      }
      res.status(400).send('Code does not match')
    } else {
      await pool.request()
        .input('IdCodigo', sql.Int, id)
        .query("UPDATE ConfirmacionCodigo SET Codigo = '', NumIntentos = 0  WHERE IdCodigo = @IdCodigo")
      res.status(200).send('Code matches')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getExists = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('IdCodigo', sql.Int, id)
      .query(queries.getCodeById)

    if (result.recordset.length === 0) {
      res.status(404).send('Code not found')
    } else {
      res.json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}
