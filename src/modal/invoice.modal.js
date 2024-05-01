import { getConnection, sql, datosCompraQueries as queries } from '../database'

export const createDatosCompraUser = async (req, res) => {
  const { user } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux', sql.VarChar, user)
      .query(queries.createDatosCompraUser)

    if (result.rowsAffected[0] > 0) res.status(201).json({ Id: result.recordset[0].Id, msg: 'DatosCompra created successfully' })
    else res.status(406).json({ msg: 'DatosCompra not created' })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateDatosCompra = async (req, res) => {
  const { id } = req.params
  const { 
    facturaAux,
    provincia,
    direccion,
    direccion2,
    cp,
    telefono,
    recordar
  } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .input('FacturaAux', sql.VarChar, facturaAux)
      .input('Provincia', sql.VarChar, provincia)
      .input('Direccion', sql.VarChar, direccion)
      .input('Direccion2', sql.VarChar, direccion2)
      .input('Cp', sql.Int, cp)
      .input('Telefono', sql.VarChar, telefono)
      .input('Recordar', sql.Bit, recordar)
      .query(queries.updateDatosCompraById)
    
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${asunto} updated` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateDatosCompraUser = async (req, res) => {
  const { id } = req.params
  const { 
    facturaAux,
    provincia,
    direccion,
    direccion2,
    cp,
    telefono,
    recordar
  } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux', sql.Int, id)
      .input('FacturaAux', sql.VarChar, facturaAux)
      .input('Provincia', sql.VarChar, provincia)
      .input('Direccion', sql.VarChar, direccion)
      .input('Direccion2', sql.VarChar, direccion2)
      .input('Cp', sql.Int, cp)
      .input('Telefono', sql.VarChar, telefono)
      .input('Recordar', sql.Bit, recordar)
      .query(queries.updateDatosCompraById)
    
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${asunto} updated` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const patchDatosCompra = async (req, res) => {
  const { id } = req.params
  const { 
    facturaAux = null,
    provincia = null,
    direccion = null,
    direccion2 = null,
    cp = null,
    telefono = null,
    recordar = null
  } = req.body

  let queryParams = []
  if (facturaAux !== null) queryParams.push(`FacturaAux = @FacturaAux`)
  if (provincia !== null) queryParams.push(`Provincia = @Provincia`)
  if (direccion !== null) queryParams.push(`Direccion = @Direccion`)
  if (direccion2 !== null) queryParams.push(`Direccion2 = @Direccion2`)
  if (cp !== null) queryParams.push(`Cp = @Cp`)
  if (telefono !== null) queryParams.push(`Telefono = @Telefono`)
  if (recordar !== null) queryParams.push(`Recordar = @Recordar`)

  if (queryParams.length === 0) return res.status(400).json({ error: 'No changes made' })

  const queryDatosCompraPatch = `UPDATE DatosCompra SET ${queryParams.join(', ')} WHERE Id = @Id`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (provincia !== null) request.input('Provincia', sql.VarChar, provincia)
    if (direccion !== null) request.input('Direccion', sql.VarChar, direccion)
    if (direccion2 !== null) request.input('Direccion2', sql.VarChar, direccion2)
    if (cp !== null) request.input('Cp', sql.Int, cp)
    if (telefono !== null) request.input('Telefono', sql.VarChar, telefono)
    if (recordar !== null) request.input('Recordar', sql.Bit, recordar)

    request.input('Id', sql.Int, id)
    const result = await request.query(queryDatosCompraPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(204).json({ msg: 'Record updated successfully' })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }

  } catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const patchDatosCompraUser = async (req, res) => {
  const { id } = req.params
  console.log(id)
  const { 
    facturaAux = null,
    provincia = null,
    direccion = null,
    direccion2 = null,
    cp = null,
    telefono = null,
    recordar = null
  } = req.body

  let queryParams = []
  if (facturaAux !== null) queryParams.push(`FacturaAux = @FacturaAux`)
  if (provincia !== null) queryParams.push(`Provincia = @Provincia`)
  if (direccion !== null) queryParams.push(`Direccion = @Direccion`)
  if (direccion2 !== null) queryParams.push(`Direccion2 = @Direccion2`)
  if (cp !== null) queryParams.push(`Cp = @Cp`)
  if (telefono !== null) queryParams.push(`Telefono = @Telefono`)
  if (recordar !== null) queryParams.push(`Recordar = @Recordar`)

  if (queryParams.length === 0) return res.status(400).json({ error: 'No changes made' })

  const queryDatosCompraPatch = `UPDATE DatosCompra SET ${queryParams.join(', ')} WHERE UsuarioAux = @UsuarioAux`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (provincia !== null) request.input('Provincia', sql.VarChar, provincia)
    if (direccion !== null) request.input('Direccion', sql.VarChar, direccion)
    if (direccion2 !== null) request.input('Direccion2', sql.VarChar, direccion2)
    if (cp !== null) request.input('Cp', sql.Int, cp)
    if (telefono !== null) request.input('Telefono', sql.VarChar, telefono)
    if (recordar !== null) request.input('Recordar', sql.Bit, recordar)

    request.input('UsuarioAux', sql.Int, id)
    const result = await request.query(queryDatosCompraPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(204).json({ msg: 'Record updated successfully' })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }

  } catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const deleteDatosCompra = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.deleteDatosCompra)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${id} deleted` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
    res.status(200).json({ msg: 'DatosCompra deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getDatosCompra = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getDatosCompraById)
    
    if (result.recordset.length === 0) {
      res.status(204).json({ msg: 'DatosCompra not found' })
    } else {
      res.status(200).json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getDatosCompraUser = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux', sql.Int, id)
      .query(queries.getDatosCompraUser)
    
    if (result.recordset.length === 0) {
      res.status(204).json({ msg: 'DatosCompra not found' })
    } else {
      res.status(200).json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


/** MIDDLEWARES**/

export const getNotFoundUser = async (req, res, next) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux', sql.Int, id)
      .query(queries.getDatosCompraUser)

    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  } catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const getNotFound = async (req, res, next) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getDatosCompraById)

    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  } catch(error){
    res.status(500).json({ error: error.message})
  }
}

//SELECT * FROM DatosCompra WHERE Id = @Id
export const getConflict = async (req, res, next) => {
  const { id } = req.params
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getDatosCompraById)
    if (result.recordset.length === 0) {
      res.status(409).json({ error: 'Record already exists'})
    } else {
      next()
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}