import { getConnection, sql, productoQueries as queries } from '../database'


/*** INSERT ***/

//INSERT INTO Producto (Nombre, Precio, Iva, Stock, Categoria, Favorito, Img, Descripcion, Ingredientes)
export const createProducto = async (req, res) => {
  const { nombre, precio } = req.body
  let { 
    iva = 0,
    stock = 0,
    categoria = 8,
    favorito = 0,
    img = null,
    descripcion = null,
    signo = '€',
    rating = 0
  } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Nombre', sql.VarChar, nombre)
      .input('Precio', sql.Float, precio)
      .input('Iva', sql.Float, iva)
      .input('Stock', sql.Int, stock)
      .input('CategoriaAux', sql.Int, categoria)
      .input('Favorito', sql.Bit, favorito)
      .input('Img', sql.VarChar, img)
      .input('Descripcion', sql.VarChar, descripcion)
      .input('Signo', sql.VarChar, signo)
      .input('Rating', sql.Int, rating)
      .query(queries.createProducto)

    res.status(201).json({ id: result.recordset[0].Id, msg: 'Record created'})
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}



/*** UPDATE ***/

//UPDATE Producto SET Nombre = @Nombre, Precio = @Precio, Iva = @Iva, Stock = @Stock, Categoria = @Categoria, Favorito = @Favorito, Img = @Img, Descripcion = @Descripcion, IngredientesAux = @IngredientesAux  WHERE Id = @Id
export const updateProductoById = async (req, res) => {
  const { id } = req.params
  const { nombre, precio, iva, stock, categoria, favorito, img, descripcion, rating, signo } = req.body
  try {
    const pool = await getConnection()
    await pool.request()
      .input('Nombre', sql.VarChar, nombre)
      .input('Precio', sql.Float, precio)
      .input('Iva', sql.Float, iva)
      .input('Stock', sql.Int, stock)
      .input('CategoriaAux', sql.Int, categoria)
      .input('Favorito', sql.Bit, favorito)
      .input('Img', sql.VarChar, img)
      .input('Descripcion', sql.VarChar, descripcion)
      .input('Rating', sql.Int, rating)
      .input('Signo', sql.VarChar, signo)
      .input('Id', sql.Int, id)
      .query(queries.updateFullProductoById)

    res.status(200).json({ msg: `Record ${nombre} updated`})
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}


//UPDATE Producto SET Nombre = @Nombre, Precio = @Precio, Iva = @Iva, Stock = @Stock, Categoria = @Categoria, Favorito = @Favorito, Img = @Img, Descripcion = @Descripcion, IngredientesAux = @IngredientesAux  WHERE Id = @Id
export const patchProductoById = async (req, res) => {
  const { id } = req.params
  let { nombre = null,
    precio = null,
    iva = null,
    stock = null,
    categoria = null,
    favorito = null,
    img = null,
    descripcion = null,
    signo = null,
    rating = null 
  } = req.body

  let queryParams = []
  if (nombre !== null) queryParams.push('Nombre = @Nombre') 
  if (precio !== null) queryParams.push('Precio = @Precio') 
  if (iva !== null) queryParams.push('IVA = @IVA') 
  if (stock !== null) queryParams.push('Stock = @Stock') 
  if (categoria !== null) queryParams.push('CategoriaAux = @CategoriaAux') 
  if (rating !== null) queryParams.push('Rating = @Rating')
  if (descripcion !== null) queryParams.push('Descripcion = @Descripcion') 
  if (favorito !== null) queryParams.push('Favorito = @Favorito') 
  if (img !== null) queryParams.push('Img = @Img')
  if (signo !== null) queryParams.push('Signo = @Signo')

  if (queryParams.length === 0) return res.status(400).json({ error: 'No changes made' })

  const queryProductoPatch = `UPDATE Producto SET ${queryParams.join(', ')} WHERE Id = @Id AND Eliminado = 0`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (nombre !== null) request.input('Nombre', sql.VarChar, nombre)
    if (precio !== null) request.input('Precio', sql.Float, precio)
    if (iva !== null) request.input('IVA', sql.Float, iva)
    if (stock !== null) request.input('Stock', sql.Int, stock)
    if (categoria !== null) request.input('CategoriaAux', sql.Int, categoria)
    if (rating !== null) request.input('Rating', sql.Int, rating)
    if (descripcion !== null) request.input('Descripcion', sql.VarChar, descripcion)
    if (favorito !== null) request.input('Favorito', sql.Bit, favorito)
    if (img !== null) request.input('Img', sql.VarChar, img)
    if (signo !== null) request.input('Signo', sql.VarChar, signo)

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

//UPDATE Producto SET Eliminado = @Eliminado WHERE Id = @Id
export const deleteProductoById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    await pool.request()
      .input('Eliminado', sql.Bit, 1)
      .input('Id', id)
      .query(queries.deleteProductoById)

    res.sendStatus(204)
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

//DELETE FROM Producto WHERE Id = @Id
export const deleteProductoByIdFinal = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    await pool.request()
      .input('Id', id)
      .query(queries.deleteProductoByIdFinal)

    res.sendStatus(204)
  }catch(error){
    res.status(500).json({ error: error.message})
  }

}


/*** SELECT ***/
//SELECT * FROM Producto
export const getAllProducto = async (req, res) => {
  const { page = 1 } = req.query
  const limit = 10
  const offset = (page - 1) * limit
  
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Offset', sql.Int, offset)
      .input('Limit', sql.Int, limit)
      .query(queries.getAllProducto)
    res.status(200).json({
      status: 'Success',
      results: result.recordset.length,
      data: result.recordset
    })
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}


export const getProductoLike = async (req, res) => {
  const { 
    excluir = false,
    page = 1,
    min = 0,
    max = 500,
    limit = 20
  } = req.query
  let { search = null } = req.query
  let { alergenos = null } = req.query
  let { categoria = null } = req.query
  let { ofertas = null } = req.query
  const offset = (page - 1) * limit

  const queryProductoLike =
  `SELECT 
    P.Id, P.Nombre, P.CategoriaAux, P.Precio, P.Signo, P.Iva, P.Stock, P.Img, P.Rating, P.Peso, P.Raciones${ofertas !== null ? `, O.OfertasInfo` : ''}
  FROM Producto P
  ${search !== null || alergenos !== null ? `LEFT JOIN Producto_Ingrediente P_I ON P.Id = P_I.ProductoAux
  LEFT JOIN Ingredientes I ON P_I.IngredienteAux = I.Id` : ''}
  ${ofertas !== null ? `
  LEFT JOIN 
    (SELECT 
        Ofertas.ProductoAux AS Id_Producto_Oferta, 
        CONCAT('[', STRING_AGG(
            CONCAT(
                '{"OfertaId":"', Ofertas.IdBanner, 
                '","Descuento":"', Descuento, 
                '","Tipo":"', Tipo, 
                '","FechaInicio":"', CONVERT(VARCHAR, FechaInicio, 120), 
                '","Patrocinador":"', Patrocinador, 
                '"}'
            ), ', '), ']'
        ) AS OfertasInfo
    FROM Ofertas WHERE FechaInicio <= GETDATE() AND FechaFin >= GETDATE() AND Tipo IN ('%','abs') GROUP BY Ofertas.ProductoAux)
  O ON P.Id = O.Id_Producto_Oferta` : ''}
  WHERE P.Precio >= @Min AND P.Precio <= @Max
    AND P.Eliminado = 0
    ${categoria !== null && parseInt(categoria) !== 0 ? `AND P.CategoriaAux = @CategoriaAux` : ''}
    ${search !== null ? `AND ${excluir === 'true' ? 'NOT' : ''} (P.Nombre COLLATE Latin1_general_CI_AI LIKE @Search COLLATE Latin1_general_CI_AI` : ''}
    ${search !== null && excluir !== 'true' ? `OR I.Nombre COLLATE Latin1_general_CI_AI LIKE @Search COLLATE Latin1_general_CI_AI` : ''}
    ${search !== null ? `)` : ''}
    ${alergenos !== null ? `AND P.Id NOT IN (
      SELECT ProductoAux
      FROM Producto_Ingrediente P_I_Sub
      INNER JOIN Ingredientes I_Sub ON P_I_Sub.IngredienteAux = I_Sub.Id
      WHERE I_Sub.AlergenoAux NOT IN (${alergenos.map(a => '@Alergeno' + a).join(',')}))` : ''}
  GROUP BY P.Id, P.Nombre, P.CategoriaAux, P.Precio, P.Signo, P.Iva, P.Stock, P.Img, P.Rating, P.Peso, P.Raciones${ofertas !== null ? `, O.OfertasInfo` : ''}
  ORDER BY P.Rating ASC
  OFFSET @Offset ROWS
  FETCH NEXT @Limit ROWS ONLY`
  
  try {
    const pool = await getConnection()
    const request = pool.request()
    request
    .input('Min', sql.Float, min)
    .input('Max', sql.Float, max)
    .input('Search', sql.VarChar, `%${search}%`)
    .input('CategoriaAux', sql.Int, categoria)
    .input('Offset', sql.Int, offset)
    .input('Limit', sql.Int, limit)
    if (alergenos !== null) {
      alergenos.forEach((alergeno, index) => {
        request.input(`Alergeno${parseInt(alergeno)}`, sql.Int, parseInt(alergeno))
      })
    }
    const result = await request.query(queryProductoLike)

    if (result.recordset.length === 0) {
      res.status(200).json({ status: 404, msg: 'Producto not found' })
    } else {
      res.status(200).json({
        status: 'Success',
        results: result.recordset.length,
        data: result.recordset
      })
    }

  } catch(error) {
    res.status(500).json({ error: error.message})
  }
}

//SELECT COUNT(*) FROM Producto
export const getTotalProducto = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .query(queries.getTotalProducto)

    res.status(200).json({
      status: 'Success',
      results: result.recordset[0]['']
    })

  }catch(error){
    res.status(500).json({ error: error.message})
  }

}

//SELECT * FROM Producto WHERE Id = @Id
export const getProductoById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id',sql.Int, id)
      .query(queries.getProductoById)

    if (result.recordset.length === 0) {
      res.status(200).json({ status:'404', msg: 'Producto not found' })
    } else {
      res.status(200).json({
        status: 'Success',
        results: result.recordset.length,
        data: result.recordset
      })
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }

}

export const getProductoIngredientesById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id',sql.Int, id)
      .query(queries.getProductoIngredientesById)

    if (result.recordset.length === 0) {
      res.status(200).json({ status:'404', msg: 'Ingredientes not found' })
    } else {
      res.status(200).json({
        status: 'Success',
        results: result.recordset.length,
        data: result.recordset
      })
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }

}

export const getProductoAlergenosById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id',sql.Int, id)
      .query(queries.getProductoAlergenosById)

    if (result.recordset.length === 0) {
      res.status(200).json({ status:'404', msg: 'Alergenos not found' })
    } else {
      res.status(200).json({
        status: 'Success',
        results: result.recordset.length,
        data: result.recordset
      })
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const getProductoOfertasById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id',sql.Int, id)
      .query(queries.getProductoOfertasById)

    if (result.recordset.length === 0) {
      res.status(200).json({ status:'404', msg: 'Ofertas not found' })
    } else {
      res.status(200).json({
        status: 'Success',
        results: result.recordset.length,
        data: result.recordset
      })
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }

}

/** MIDDLEWARES**/

//SELECT * FROM Producto WHERE Id = @Id
export const getNotFound = async (req, res, next) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getProductoById)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

//SELECT * FROM Producto WHERE Id = @Id
export const getConflict = async (req, res, next) => {
  const { id } = req.params
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getProductoById)
    if (result.recordset.length === 0) {
      res.status(409).json({ error: 'Record already exists'})
    } else {
      next()
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }

}