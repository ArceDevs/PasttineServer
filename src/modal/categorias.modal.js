import { getConnection, sql, categoriasQueries as queries } from '../database'

export const createCategorias = async (req, res) => {
  const { nombre } = req.body

  try {
    const pool = await getConnection()
    await pool.request()
      .input('Nombre', sql.VarChar, nombre)
      .query(queries.createCategorias)
    res.status(201).json({ msg: 'Categorias created successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateCategoriasById = async (req, res) => {
  const { id } = req.params
  const { nombre } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .input('Nombre', sql.VarChar, nombre)
      .query(queries.updateCategoriasById)
    
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${nombre} updated` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const patchCategoriasById = async (req, res) => {
  const { id } = req.params
  const { nombre = null } = req.body

  let queryParams = []
  if (nombre !== null) queryParams.push('Nombre = @Nombre') 

  const queryCategoriasPatch = `UPDATE Categorias SET ${queryParams.join(', ')} WHERE Id = @Id`

  try {
    const pool = await getConnection()
    const request = pool.request()
    if (nombre !== null) request.input('Nombre', sql.VarChar, nombre)
    request.input('Id', sql.Int, id)
    const result = await request.query(queryCategoriasPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: 'Record updated successfully' })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }

  } catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const deleteCategoriasById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.deleteCategoriasById)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Record ${id} deleted` })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
    res.status(200).json({ msg: 'Categorias deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllCategorias = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .query(queries.getAllCategorias)
    
    res.status(200).json({
      status: 'Success',
      results: result.recordset.length,
      data: result.recordset
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCategoriasById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getCategoriasById)
    
    if (result.recordset.length === 0) {
      res.status(404).json({ msg: 'Categorias not found' })
    } else {
      res.status(200).json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//SELECT COUNT(*) FROM Categorias
export const getTotalCategorias = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .query(queries.getTotalCategorias)

    res.status(200).json({
      status: 'Success',
      results: result.recordset[0]['']
    })

  }catch(error){
    res.status(500).json({ error: error.message})
  }

}

/** MIDDLEWARES**/

//SELECT * FROM Categorias WHERE Id = @Id
export const getNotFound = async (req, res, next) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getCategoriasById)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

//SELECT * FROM Categorias WHERE Id = @Id
export const getConflict = async (req, res, next) => {
  const { id } = req.params
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getCategoriasById)
    if (result.recordset.length === 0) {
      res.status(409).json({ error: 'Record already exists'})
    } else {
      next()
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }

}