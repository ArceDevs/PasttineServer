import { getConnection, sql, ofertasQueries as queries } from '../database'

/*** INSERT ***/

export const createOferta = async (req, res) => {
  const { tipo, descuento, productoAux, video, banner, patrocinador, fechaInicio, fechaFin } = req.body
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Tipo', sql.VarChar, tipo)
      .input('Descuento', sql.Float, descuento)
      .input('ProductoAux', sql.Int, productoAux)
      .input('Video', sql.VarChar, video)
      .input('Banner', sql.VarChar, banner)
      .input('Patrocinador', sql.VarChar, patrocinador)
      .input('FechaInicio', sql.DateTime2, fechaInicio)
      .input('FechaFin', sql.DateTime2, fechaFin)
      .query(queries.createOferta)

    res.json({ id: result.recordset[0].Id, status: 200 })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

/*** UPDATE ***/

export const updateOfertaById = async (req, res) => {
  const { id } = req.params
  const { tipo, descuento, productoAux, video, banner, patrocinador, fechaInicio, fechaFin } = req.body

  try {
    const pool = await getConnection()
    await pool.request()
      .input('IdBanner', sql.Int, id)
      .input('Tipo', sql.VarChar, tipo)
      .input('Descuento', sql.Float, descuento)
      .input('ProductoAux', sql.Int, productoAux)
      .input('Video', sql.VarChar, video)
      .input('Banner', sql.VarChar, banner)
      .input('Patrocinador', sql.VarChar, patrocinador)
      .input('FechaInicio', sql.DateTime2, fechaInicio)
      .input('FechaFin', sql.DateTime2, fechaFin)
      .query(queries.updateOfertaById)

    res.status(200).send('Oferta updated successfully')
  } catch (error) {
    res.status(500).send(error.message)
  }
}

/*** DELETE ***/

export const deleteOfertaById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    await pool.request()
      .input('IdBanner', sql.Int, id)
      .query(queries.deleteOfertaById)

    res.sendStatus(204)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const deleteOfertaByIdFinal = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    await pool.request()
      .input('IdBanner', sql.Int, id)
      .query(queries.deleteOfertaByIdFinal)

    res.sendStatus(204)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

/*** SELECT ***/

export const getOfertasBanner = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request().query(queries.getOfertasBanner)
    
    if (result.recordset.length === 0) {
      res.status(200).json({ status: 404, msg: 'There are not any active offer currently' })
    } else {
      res.status(200).json({
        status: 'Success',
        results: result.recordset.length,
        data: result.recordset
      })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getOfertasVideo = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request().query(queries.getOfertasVideo)
    
    if (result.recordset.length === 0) {
      res.status(200).json({ status: 404, msg: 'There are not active offers currently' })
    } else {
      res.status(200).json({
        status: 'Success',
        results: result.recordset.length,
        data: result.recordset
      })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getOfertasImg = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request().query(queries.getOfertasImg)
    
    if (result.recordset.length === 0) {
      res.status(200).json({ status: 404, msg: 'There are not active offers currently' })
    } else {
      res.status(200).json({
        status: 'Success',
        results: result.recordset.length,
        data: result.recordset
      })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getAllOfertas = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request().query(queries.getAllOfertas)
    res.json(result.recordset)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getTotalOfertas = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request().query(queries.getTotalOfertas)
    res.json(result.recordset[0][''])
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getOfertaById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('IdBanner', sql.Int, id)
      .query(queries.getOfertaById)

    if (result.recordset.length === 0) {
      res.status(404).send('Oferta not found')
    } else {
      res.json(result.recordset[0])
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
      .input('IdBanner', sql.Int, id)
      .query(queries.getOfertaById)

    if (result.recordset.length === 0) {
      res.status(404).send('Oferta not found')
    } else {
      res.json(result.recordset[0])
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}
