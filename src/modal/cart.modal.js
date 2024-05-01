import { getConnection, sql, carritoQueries as cartQueries, detallesCarritoQueries as detailsQueries } from '../database'

/* CREATE CARRITO AND DETAILS */
export const createCarrito = async (req, res) => {
  const { 
    usuarioAux,
    precio = 0, 
    promocion = 0
  } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Precio', sql.Float, precio)
      .input('Promocion', sql.Float, promocion)
      .input('UsuarioAux', sql.Int, usuarioAux)
      .query(cartQueries.createCarrito)

    res.status(201).json({ id: result.recordset[0].Id, msg: 'Cart created'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createDetails = async (req, res) => {
  const { 
    carritoAux,
    precioDetalle = 0, 
    productoAux,
    cantidad = 1,
    racionComprada = false
  } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('ProductoAux', sql.Int, productoAux)
      .input('Cantidad', sql.Int, cantidad)
      .input('PrecioDetalle', sql.Float, precioDetalle)
      .input('CarritoAux', sql.Int, carritoAux)
      .input('RacionComprada', sql.Bit, racionComprada == true ? 1 : 0)
      .query(detailsQueries.createDetallesCarrito)

    res.status(201).json({ IdDetalle: result.recordset[0].IdDetalle, msg: 'Detalle created'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/* UPDATE CARRITO AND DETAILS */
export const   updateCarrito = async (req, res) => {
  const { id } = req.params
  const { 
    usuarioAux,
    precio = 0,
    promocion = 0
  } = req.body
  
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Precio', sql.Float, precio)
      .input('Promocion', sql.Float, promocion)
      .input('UsuarioAux', sql.Int, usuarioAux)
      .input('Id', sql.Int, id)
      .query(cartQueries.updateCarritoById)

    res.status(201).json({ id: result.recordset[0].Id, msg: 'Cart created'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateDetailsById = async (req, res) => {
  const { id } = req.params
  const { 
    carritoAux,
    productoAux,
    precioDetalle = 0,
    cantidad = 1,
    racionComprada
  } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('ProductoAux', sql.Int, productoAux)
      .input('Cantidad', sql.Int, cantidad)
      .input('PrecioDetalle', sql.Float, precioDetalle)
      .input('CarritoAux', sql.Int, carritoAux)
      .input('RacionComprada', sql.Bit, racionComprada == true ? 1 : 0)
      .input('IdDetalle', sql.Int, id)
      .query(detailsQueries.updateDetallesCarritoById)

    if (result.rowsAffected[0] > 0) {
      res.status(204).json({ msg: `Carrito ${id} updated` })
    } else {
      res.status(404).json({ msg: 'Carrito not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


/* PATCH CARRITO AND DETAILS */
export const patchCarrito = async (req, res) => {
  const { id } = req.params

  const { 
    usuarioAux = null,
    precio = null,
    promocion = null
  } = req.body

  let queryParams = []
  if (precio !== null) queryParams.push('Precio = @Precio')
  if (promocion !== null) queryParams.push('Promocion = @Promocion')
  if (usuarioAux !== null) queryParams.push('UsuarioAux = @UsuarioAux')

  const queryCarritoPatch = 
    `UPDATE Carrito
    SET ${queryParams.join(', ')} 
    WHERE Id = @Id`

  if (queryParams.length === 0) res.status(400).json({ msg: 'No changes made' })  

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (precio !== null) request.input('Precio', sql.Float, precio)
    if (promocion !== null) request.input('Promocion', sql.Float, promocion)
    if (usuarioAux !== null) request.input('UsuarioAux', sql.Int, usuarioAux)
    request.input('Id', sql.Int, id)
    const result = await request.query(queryCarritoPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Carrito ${id} updated` })
    } else {
      res.status(204).json({ msg: 'Carrito not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const patchDetail = async (req, res) => {
  const { id } = req.params

  const { 
    carritoAux = null,
    productoAux = null,
    precioDetalle = null,
    cantidad = null,
    racionComprada = null
  } = req.body

  let queryParams = []
  if (precioDetalle !== null) queryParams.push('PrecioDetalle = @PrecioDetalle')
  if (cantidad !== null) queryParams.push('Cantidad = @Cantidad')
  if (carritoAux !== null) queryParams.push('CarritoAux = @CarritoAux')
  if (productoAux !== null) queryParams.push('ProductoAux = @ProductoAux')
  if (racionComprada !== null) queryParams.push('RacionComprada = @RacionComprada')

  if (queryParams.length === 0) res.status(400).json({ msg: 'No changes made' })

  const queryCarritoPatch = 
    `UPDATE DetallesCarrito
    SET ${queryParams.join(', ')} 
    WHERE IdDetalle = @IdDetalle`

  try {
    const pool = await getConnection()
    const request = pool.request()
    if (precioDetalle !== null) request.input('PrecioDetalle', sql.Float, precioDetalle)
    if (cantidad !== null) request.input('Cantidad', sql.Int, cantidad)
    if (carritoAux !== null) request.input('CarritoAux', sql.Int, carritoAux)
    if (productoAux !== null) request.input('ProductoAux', sql.Int, productoAux)
    if (racionComprada !== null) request.input('RacionComprada', sql.Bit, racionComprada == true ? 1 : 0)
    request.input('IdDetalle', sql.Int, id)
    request.query(queryCarritoPatch)

    res.status(204).json({ msg: 'Detail updated'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/* DELETE CARRITO AND DETAILS */
export const deleteCarrito = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    await pool.request()
      .input('Id', sql.Int,id)
      .query(cartQueries.deleteCarritoById)

    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteDetails = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    await pool.request()
      .input('IdDetalle', sql.Int,id)
      .query(detailsQueries.deleteDetallesCarritoById)

    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteDetailsByCart = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    await pool.request()
      .input('CarritoAux', sql.Int, id)
      .query(detailsQueries.deleteDetallesCarritoByIdCarrito)

    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/* GET CARRITO AND DETAILS */
export const getCarritoById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id',sql.Int, id)
      .query(cartQueries.getCarritoById)

    if (result.recordset.length === 0) {
      res.status(204).json({ msg: 'Producto not found' })
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

export const getCarritoUser = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux',sql.Int, id)
      .query(cartQueries.getCarritoUser)

    if (result.recordset.length === 0) {
      res.status(204).json({ msg: 'Carrito not found' })
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

export const getDetallesById = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('IdDetalle',sql.Int, id)
      .query(detailsQueries.getDetallesCarritoById)

    if (result.recordset.length === 0) {
      res.status(204).json({ msg: 'The Carrito is empty' })
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

export const getDetallesUser = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux',sql.Int, id)
      .query(detailsQueries.getDetallesUser)

    if (result.recordset.length === 0) {
      res.status(204).json({
        msg: 'The Carrito is empty',
        status: 'No Content',
        results: 0,
        data: []
      })
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

export const getDetallesCart = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('CarritoAux',sql.Int, id)
      .query(detailsQueries.getDetallesCart)

    if (result.recordset.length === 0) {
      res.status(204).json({ msg: 'The Carrito is empty' })
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

export const getCartFullUser = async (req, res) => {
  const { id } = req.params

  var respuesta = {}

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux',sql.Int, id)
      .query(cartQueries.getCarritoUser)

    if (result.recordset.length === 0) {
      res.status(204).json({ msg: 'The Carrito does not exist' })
    } else {
      respuesta.Carrito = result.recordset
      const resultDetalle = await pool.request()
        .input('CarritoAux',sql.Int, result.recordset[0].Id)
        .query(detailsQueries.getDetallesCart)

        if (resultDetalle.recordset.length === 0) {
          res.status(206).json({
            msg: 'The Detalles is empty',
            data: respuesta
          })
        } else {
          respuesta.Detalles = resultDetalle.recordset
          res.status(200).json({
            status: 'Success',
            results: result.recordset.length,
            data: respuesta
          })
        }
        
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const createCarritoAndDetails = async (req, res) => {
  const { 
    UsuarioAux, 
    Precio = 0, 
    PrecioProducto = 0, 
    Promocion = 0,
    ProductoAux,
    Cantidad = 1,
  } = req.body

  if (Precio === 0) {
    Precio = PrecioProducto * Cantidad
  }

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux', sql.Int, UsuarioAux)
      .input('Precio', sql.Float, Precio)
      .input('Promocion', sql.Float, Promocion)
      .query(cartQueries.createCarrito)

    const { IdCarrito } = result.recordset[0]

    await pool.request()
      .input('ProductoAux', sql.Int, ProductoAux)
      .input('Cantidad', sql.Int, Cantidad)
      .input('Precio', sql.Float, PrecioProducto)
      .input('CarritoAux', sql.Int, IdCarrito)
      .query(detailsQueries.createDetallesCarrito)

    res.status(201).json({ id: result.recordset[0].Id, msg: 'Cart created'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateCarritoUser = async (req, res) => {
  const { UsuarioAux } = req.params
  const { 
    Precio, 
    PrecioProducto, 
    Promocion,
    ProductoAux,
    Cantidad
  } = req.body

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux', sql.Int, UsuarioAux)
      .input('Precio', sql.Float, Precio)
      .input('Promocion', sql.Float, Promocion)
      .query(cartQueries.updateCarritoUser)


    const resultDetails = await pool.request()
      .input('ProductoAux', sql.Int, ProductoAux)
      .input('Cantidad', sql.Int, Cantidad)
      .input('Precio', sql.Float, PrecioProducto)
      .input('CarritoAux', sql.Int, id)
      .query(detailsQueries.createDetallesCarrito)

    if (result.rowsAffected[0] > 0 && resultDetails.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Carrito ${id} updated` })
    } else if (result.rowsAffected[0] > 0 || resultDetails.rowsAffected[0] > 0) {
      // 206 Partial Content
      res.status(206).json({ 
        msg: `${result.rowsAffected[0] > 0 ? 'Carrito' : 'Only the details have been'} updated` })
    } else {
      // 204 No Content
      res.status(204).json({ msg: 'Carrito not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const patchCarritoUser = async (req, res) => {
  const { UsuarioAux } = req.params
  const { 
    Precio = null, 
    Promocion = null 
  } = req.body

  let queryParams = []
  if (Precio !== null) queryParams.push('Precio = @Precio')
  if (Promocion !== null) queryParams.push('Promocion = @Promocion')
  const queryCarritoPatch = `UPDATE Carrito SET ${queryParams.join(', ')} WHERE UsuarioAux = @UsuarioAux`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (Precio !== null) request.input('Precio', sql.Float, Precio)
    if (Promocion !== null) request.input('Promocion', sql.Float, Promocion)
    request.input('UsuarioAux', sql.Int, UsuarioAux)
    const result = await request.query(queryCarritoPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: 'Carrito updated successfully' })
    } else {
      res.status(404).json({ msg: 'Carrito not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const patchDetallesCarritoUser = async (req, res) => {
  const { 
    ProductoAux,
    UsuarioAux,
    Precio = null, 
    Promocion = null,
    Cantidad = null,
  } = req.body

  let queryParams = []
  if (Precio !== null) queryParams.push('Precio = @Precio')
  if (Promocion !== null) queryParams.push('Promocion = @Promocion')
  if (Cantidad !== null) queryParams.push('Cantidad = @Cantidad')
  const queryCarritoPatch = 
    `UPDATE DetallesCarrito D
    LEFT JOIN Carrito C ON D.CarritoAux = C.Id 
    SET ${queryParams.join(', ')} 
    WHERE D.ProductoAux = @ProductoAux AND C.UsuarioAux = @UsuarioAux`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (Precio !== null) request.input('Precio', sql.Float, Precio)
    if (Promocion !== null) request.input('Promocion', sql.Float, Promocion)
    if (Cantidad !== null) request.input('Cantidad', sql.Int, Cantidad)
    request.input('UsuarioAux', sql.Int, UsuarioAux)
    request.input('ProductoAux', sql.Int, ProductoAux)
    const result = await request.query(queryCarritoPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: `Carrito from user ${UsuarioAux} updated successfully` })
    } else {
      res.status(204).json({ msg: 'Carrito not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const patchCarritoAndDetallesUserBatch = async (req, res) => {
  const { UsuarioAux } = req.params
  const {
    Precio = null, 
    Promocion = null,
    detalles
  } = req.body

  let carritoUpdated = false
  let detallesUpdated = false

  // Actualizar Carrito
  let queryParamsCarrito = []
  if (Precio !== null) queryParamsCarrito.push('Precio = @Precio')
  if (Promocion !== null) queryParamsCarrito.push('Promocion = @Promocion')

  if (queryParamsCarrito.length > 0) {
    const queryCarritoPatch = `UPDATE Carrito SET ${queryParamsCarrito.join(', ')} WHERE UsuarioAux = @UsuarioAux`
    const pool = await getConnection()
    const requestCarrito = pool.request()

    if (UsuarioAux !== null) requestCarrito.input('UsuarioAux', sql.Int, UsuarioAux)
    if (Precio !== null) requestCarrito.input('Precio', sql.Float, Precio)
    if (Promocion !== null) requestCarrito.input('Promocion', sql.Float, Promocion)
    requestCarrito.input('UsuarioAux', sql.Int, UsuarioAux)

    const resultCarrito = await requestCarrito.query(queryCarritoPatch)
    carritoUpdated = resultCarrito.rowsAffected[0] > 0
  }

  // Actualizar DetallesCarrito
  if (detalles && detalles.length > 0) {
    const pool = await getConnection()
    const requestDetalle = pool.request()

    const queryDetallePatch = `UPDATE DetallesCarrito D LEFT JOIN Carrito C ON D.CarritoAux = C.Id SET `
    const queryCantidad = `Cantidad = CASE ProductoAux ` 
    const queryPrecioProducto = `Precio = CASE ProductoAux ` 
    const queryProductoAux = `WHERE ProductoAux IN (`

    let index = 0

    for (const detalle of detalles) {
      const { ProductoAux, Cantidad = null, PrecioProducto = null } = detalle 
    
      if (ProductoAux !== null)  queryProductoAux += `ProductoAux${index},`
      if (Cantidad !== null) queryCantidad += `WHEN ProductoAux${index} THEN Cantidad${index} `
      if (PrecioProducto !== null) queryPrecioProducto += `WHEN ProductoAux${index} THEN PrecioProducto${index} `

      if (ProductoAux !== null) requestDetalle.input('ProductoAux'+index, sql.Int, ProductoAux)
      if (Cantidad !== null) requestDetalle.input('Cantidad'+index, sql.Int, Cantidad)
      if (PrecioProducto !== null) requestDetalle.input('Precio'+index, sql.Float, PrecioProducto)

      if (index === detalles.length - 1) {
        queryProductoAux.substring(0, queryProductoAux.length - 1) + ')'
        queryCantidad += 'END, '
        queryPrecioProducto += 'END, '
      }
      index++
    }

    if (detalles[0].Cantidad !== null) queryDetallePatch += queryCantidad
    if (detalles[0].PrecioProducto !== null) queryDetallePatch += queryPrecioProducto
    queryDetallePatch.substring(0, queryDetallePatch.length - 2)
    queryDetallePatch += queryProductoAux

    console.log(queryDetallePatch)

    // const resultDetalle = await requestDetalle.query(queryDetallePatch)
    // if (resultDetalle.rowsAffected[0] > 0) {
    //   detallesUpdated = true
    // }
  }

  // Enviar respuesta
  if (carritoUpdated || detallesUpdated) {
    res.status(200).json({ msg: 'Carrito and/or Detalles updated successfully' })
  } else {
    res.status(404).json({ msg: 'No changes made or not found' })
  }
}


export const updateCarritoAndDetallesUser = async (req, res) => {
  const { UsuarioAux } = req.params
  const {
    Precio = null, 
    Promocion = null,
    detalles
  } = req.body

  let carritoUpdated = false
  let detallesUpdated = false

  const pool = await getConnection()
  const resultCarrito = await pool.request()
    .input('Precio', sql.Float, Precio)
    .input('Promocion', sql.Float, Promocion)
    .input('UsuarioAux', sql.Int, UsuarioAux)
    .query(cartQueries.updateCarritoUser)

  carritoUpdated = resultCarrito.rowsAffected[0] > 0

  // Actualizar DetallesCarrito
  if (detalles && detalles.length > 0) {
    const pool = await getConnection()
    const requestDetalle = pool.request()

    const queryDetallePatch = `UPDATE DetallesCarrito D LEFT JOIN Carrito C ON D.CarritoAux = C.Id SET `
    const queryCantidad = `Cantidad = CASE ProductoAux ` 
    const queryPrecioDetalle = `PrecioDetalle = CASE ProductoAux ` 
    const queryProductoAux = `WHERE ProductoAux IN (`

    let index = 0

    for (const detalle of detalles) {
      const { ProductoAux, Cantidad, PrecioDetalle, racionComprada = false } = detalle 
    
      queryProductoAux += `ProductoAux${index},`
      queryCantidad += `WHEN ProductoAux${index} THEN Cantidad${index} `
      queryPrecioDetalle += `WHEN ProductoAux${index} THEN PrecioDetalle${index} `

      requestDetalle.input('ProductoAux'+index, sql.Int, ProductoAux)
      requestDetalle.input('Cantidad'+index, sql.Int, Cantidad)
      requestDetalle.input('PrecioDetalle'+index, sql.Float, PrecioDetalle)

      if (index === detalles.length - 1) {
        queryProductoAux.substring(0, queryProductoAux.length - 1) + ')'
        queryCantidad += 'END, '
        queryPrecioDetalle += 'END, '
      }
      index++
    }

    queryDetallePatch += queryCantidad
    queryDetallePatch += queryPrecioDetalle
    queryDetallePatch.substring(0, queryDetallePatch.length - 2)
    queryDetallePatch += queryProductoAux

    console.log(queryDetallePatch)

    // const resultDetalle = await requestDetalle.query(queryDetallePatch)
    // if (resultDetalle.rowsAffected[0] > 0) {
    //   detallesUpdated = true
    // }
  }
}

/** MIDDLEWARES**/
export const getNotFoundCarrito = async (req, res, next) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(cartQueries.getCarritoById)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const getNotFoundDetalles = async (req, res, next) => {
  const { carritoAux, productoAux } = req.body
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('CarritoAux', sql.Int, carritoAux)
      .input('ProductoAux', sql.Int, productoAux)
      .query(detailsQueries.getConflictDetalles)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

//SELECT * FROM Carrito WHERE Id = @Id
export const getConflictCarrito = async (req, res, next) => {
  const { usuarioAux } = req.body
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux', usuarioAux)
      .query(cartQueries.getCarritoUser)
    if (result.recordset.length !== 0) {
      res.status(409).json({ error: 'Record already exists'})
    } else {
      next()
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const getConflictDetalles = async (req, res, next) => {
  const { carritoAux, productoAux } = req.body
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('CarritoAux', sql.Int, carritoAux)
      .input('ProductoAux', sql.Int, productoAux)
      .query(detailsQueries.getConflictDetalles)
    if (result.recordset.length !== 0) {
      res.status(409).json({ error: 'Record already exists'})
    } else {
      next()
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const checkCart = async (req, res) => {
  const { id } = req.params

  const query = 
    `SELECT IdDetalle, Cantidad, Stock, PrecioDetalle FROM Carrito C
    RIGHT JOIN DetallesCarrito D ON C.Id = D.CarritoAux
    LEFT JOIN Producto P ON D.ProductoAux = P.Id 
    WHERE C.UsuarioAux = @UsuarioAux AND D.Cantidad > P.Stock`
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux', sql.Int, id)
      .query(query)
      
    if (result.recordset.length === 0) return res.status(204).json({ msg: 'The cart is able to purchase' })

    const removedItems = []
    const updatedItems = []
    const newQuantity = []
    var newTotal = 0

    result.recordset.forEach(detail => {
      if (detail.Stock === 0) {
        removedItems.push(detail.IdDetalle)
      } else if (detail.Cantidad < detail.Stock) {
        updatedItems.push(detail.IdDetalle)
        newQuantity.push(detail.Stock)
        newTotal += detail.Stock * detail.PrecioDetalle
      } else {
        newTotal += detail.Cantidad * detail.PrecioDetalle
      }
    })

    for(let i = 0; i < removedItems.length; i++) {
      await pool.request()
        .input('IdDetalle', sql.Int, removedItems[i])
        .query('DELETE FROM DetallesCarrito WHERE IdDetalle = @IdDetalle')
    }

    for(let i = 0; i < updatedItems.length; i++) {
      await pool.request()
        .input('IdDetalle', sql.Int, updatedItems[i])
        .input('newQuantity', sql.Int, newQuantity[i])
        .query('UPDATE DetallesCarrito SET Cantidad = @newQuantity WHERE IdDetalle = @IdDetalle')
    }

    await pool.request()
      .input('UsuarioAux', sql.Int, id)
      .input('Precio', sql.Float, newTotal)
      .query('UPDATE Carrito SET Precio = @Precio WHERE UsuarioAux = @UsuarioAux')

    const cart = await pool.request()
      .input('UsuarioAux',sql.Int, id)
      .query(cartQueries.getCarritoUser)

    const details = await pool.request()
      .input('CarritoAux',sql.Int, cart.recordset[0].Id)
      .query(detailsQueries.getDetallesCart)

    res.status(200).json({
      status: 'Updated',
      Eliminados: removedItems,
      Actualizados: updatedItems,
      Carrito: cart.recordset[0],
      Detalles: details.recordset
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}