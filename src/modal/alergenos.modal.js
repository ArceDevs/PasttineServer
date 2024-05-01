import { getConnection, sql, alergenosQueries as queries } from '../database'

export const createAlergeno = async (req, res) => {
  const { nombre, img = null } = req.body

  try {
    const pool = await getConnection()
    await pool.request()
      .input('Nombre', sql.VarChar, nombre)
      .input('Img', sql.VarChar, img)
      .query(queries.createAlergeno)
    res.status(201).json({ msg: 'Alergeno created successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateAlergenoById = async (req, res) => {
  const { id } = req.params
  const { nombre, img = null } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .input('Nombre', sql.VarChar, nombre)
      .input('Img', sql.VarChar, img)
      .query(queries.updateAlergenoById)
    
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${nombre} updated` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const patchAlergenosById = async (req, res) => {
  const { id } = req.params
  const { nombre = null,
    img = null
  } = req.body

  let queryParams = []
  if (nombre !== null) queryParams.push('Nombre = @Nombre') 
  if (img !== null) queryParams.push('Img = @Img')

  const queryAlergenosPatch = `UPDATE Alergenos SET ${queryParams.join(', ')} WHERE Id = @Id`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (nombre !== null) request.input('Nombre', sql.VarChar, nombre)
    if (img !== null) request.input('Img', sql.VarChar, img)

    request.input('Id', sql.Int, id)
    const result = await request.query(queryAlergenosPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: 'Record updated successfully' })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }

  } catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const deleteAlergenoById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.deleteAlergenoById)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${id} deleted` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
    res.status(200).json({ msg: 'Alergeno deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllAlergenos = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .query(queries.getAllAlergenos)
    
    res.status(200).json({
      status: 'Success',
      results: result.recordset.length,
      data: result.recordset
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAlergenoById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getAlergenoById)
    
    if (result.recordset.length === 0) {
      res.status(404).json({ msg: 'Alergeno not found' })
    } else {
      res.status(200).json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//SELECT COUNT(*) FROM Alergenos
export const getTotalAlergenos = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .query(queries.getTotalAlergenos)

    res.status(200).json({
      status: 'Success',
      results: result.recordset[0]['']
    })

  }catch(error){
    res.status(500).json({ error: error.message})
  }

}

/** MIDDLEWARES**/

//SELECT * FROM Alergenos WHERE Id = @Id
export const getNotFound = async (req, res, next) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getAlergenoById)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

//SELECT * FROM Alergenos WHERE Id = @Id
export const getConflict = async (req, res, next) => {
  const { id } = req.params
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getAlergenoById)
    if (result.recordset.length === 0) {
      res.status(409).json({ error: 'Record already exists'})
    } else {
      next()
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }

}