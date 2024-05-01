if (process.env.NODE_ENV !== 'production') { require('dotenv').config }
import { getConnection, sql, facturaQueries as queries, detallesFacturaQueries, detallesCarritoQueries } from '../database'
import { sendEmail } from '../helpers/email-transporter'

/* COMPLETAR FACTURA */
export const terminarCompra = async (req, res) => {
  const { id } = req.params
  const { usuarioAux } = req.body
  
  try {
    const pool = await getConnection()

    await pool.request()
      .input('Id', sql.Int, id)
      .input('FechaCompra', sql.DateTime2, new Date())
      .query("UPDATE Factura SET Estado = 'Pagado', FechaCompra = FechaCompra WHERE Id = @Id")

    const newfactura = await pool.request()
      .input('Id', sql.Int, id)
      .query('SELECT * FROM Factura WHERE Id = @Id')

    const facturaData = await pool.request()
      .input('FacturaAux', sql.Int, id)
      .query(detallesFacturaQueries.getDetallesFacturaByFacturaAux)

    const user = await pool.request()
      .input('Id', sql.Int, usuarioAux)
      .query('SELECT Username, Email FROM Usuario WHERE Id = @Id')

    await pool.request()
      .input('UsuarioAux', sql.Int, usuarioAux)
      .query('UPDATE Carrito SET Precio = 0, Promocion = 0 WHERE UsuarioAux = @UsuarioAux')

    await pool.request()
      .input('UsuarioAux', sql.Int, usuarioAux)
      .query(detallesCarritoQueries.deleteDetallesCarritoFull)

    facturaData.recordset.forEach(async (item) => {
      await pool.request()
        .input('ProductoAux', sql.Int, item.ProductoAux)
        .input('Cantidad', sql.Int, item.Cantidad)
        .query('UPDATE Producto SET Stock = Stock - @Cantidad WHERE Id = @ProductoAux')
    })

    if (newfactura.recordset.length > 0) {
      /*** MAIL AL USUARIO ***/
      const mailOptionsUser = {
        from: `Pasttine <${process.env.EMAIL_CONTACTO}>`,
        to: user.recordset[0].Email,
        subject: 'Resume de tu compra en Pasttine',
        text: 
        `Este es el resume de tu compra en Pasttine.
        Precio: ${newfactura.recordset[0].Precio}
        Promocion: ${newfactura.recordset[0].Promocion}
        FechaCompra: ${new Date()}
        
        Productos Comprados:
        ${facturaData.recordset.map((item, index) => {
          return `
          ${index + 1}:
          Nombre: ${item.Nombre}
          Precio: ${item.Precio}
          Cantidad: ${item.Cantidad}
          `
        })}`
      }
      const enviadoUser = await sendEmail(mailOptionsUser)
      const responseDataUser = {
        msg: 'Email send',
        Factura: newfactura.recordset[0],
        DetallesFactura: facturaData.recordset
      }
      if (enviadoUser) res.status(200).json(responseDataUser)
      else res.status(400).json({ msg: 'An error has occurred on email send' })

      /*** MAIL A LA PAGINA ***/
      const mailOptions = {
        from: `Pasttine <${process.env.EMAIL_CONTACTO}>`,
        to: process.env.EMAIL_CONTACTO,
        subject: 'Nueva compra en Pasttine del usuario ' + id,
        text: 
        `El usuario ${id} ha realizado una nueva compra.
        Precio: ${newfactura.recordset[0].Precio}
        Promocion: ${newfactura.recordset[0].Promocion}
        FechaCompra: ${newfactura.recordset[0].FechaCompra}
        
        Productos Comprados:
        ${facturaData.recordset.map((item, index) => {
          return `
          ${index + 1}:
          Nombre: ${item.Nombre}
          Precio: ${item.Precio}
          Cantidad: ${item.Cantidad}
          `
        })}`
      }
      sendEmail(mailOptions)
    }

    setTimeout(() => {
      pool.request()
      .input('Id', sql.Int, id)
      .query("UPDATE Factura SET Estado = 'Completado' WHERE Id = @Id")
    }, 1000)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/* CREATE FACTURA AND DETAILS */
export const createFactura = async (req, res) => {
  const { user } = req.params

  try {
    const pool = await getConnection()
    const factura = await pool.request()
      .input('UsuarioAux', sql.Int, user)
      .query(queries.createFactura)

    await pool.request()
      .input('UsuarioAux', sql.Int, user)
      .input('FacturaAux', sql.Int, factura.recordset[0].Id)
      .query(detallesFacturaQueries.createDetallesFactura)

    res.status(201).json({ Id: factura.recordset[0].Id, msg: 'Factura created'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/* UPDATE FACTURA */
export const updateFacturaUser = async (req, res) => {
  const { id } = req.params
  const { precio, promocion, fechaCompra, estado } = req.body
  try {
    const pool = await getConnection()
    await pool.request()
      .input('UsuarioAux', sql.Int, id)
      .input('Precio', sql.Float, precio)
      .input('Promocion', sql.Float, promocion)
      .input('FechaCompra', sql.DateTime2, fechaCompra)
      .input('Estado', sql.VarChar, estado)
      .query(queries.updateFacturaUser)

    res.status(200).json({ msg: `Record ${nombre} updated`})
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

/* PATCH FACTURA */
export const patchFactura = async (req, res) => {
  const { id } = req.params
  let { 
    precio = null, 
    promocion = null, 
    fechaCompra = null, 
    anulado = null, 
    estado = null
  } = req.body

  let queryParams = []
  if (precio !== null) queryParams.push('Precio = @Precio')
  if (promocion !== null) queryParams.push('Promocion = @Promocion')
  if (fechaCompra !== null) queryParams.push('FechaCompra = @FechaCompra')
  if (anulado !== null) queryParams.push('Anulado = @Anulado')
  if (estado !== null) queryParams.push('Estado = @Estado')

  if (queryParams.length === 0) return res.status(400).json({ error: 'No changes made' })

  const queryFacturaPatch = `UPDATE Factura SET ${queryParams.join(', ')} WHERE Id = @Id`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (precio !== null) request.input('Precio', sql.Float, precio)
    if (promocion !== null) request.input('Promocion', sql.Float, promocion)
    if (fechaCompra !== null) request.input('FechaCompra', sql.DateTime2, fechaCompra)
    if (anulado !== null) request.input('Anulado', sql.Bit, anulado)
    if (estado !== null) request.input('Estado', sql.VarChar, estado)

    request.input('Id', sql.Int, id)
    const result = await request.query(queryFacturaPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(204).json({ msg: 'Record updated successfully' })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const patchFacturaUser = async (req, res) => {
  const { id } = req.params
  let { 
    precio = null, 
    promocion = null, 
    fechaCompra = null, 
    anulado = null, 
    estado = null
  } = req.body

  let queryParams = []
  if (precio !== null) queryParams.push('Precio = @Precio')
  if (promocion !== null) queryParams.push('Promocion = @Promocion')
  if (fechaCompra !== null) queryParams.push('FechaCompra = @FechaCompra')
  if (anulado !== null) queryParams.push('Anulado = @Anulado')
  if (estado !== null) queryParams.push('Estado = @Estado')

  if (queryParams.length === 0) return res.status(400).json({ error: 'No changes made' })

  const queryFacturaPatch = `UPDATE Factura SET ${queryParams.join(', ')} WHERE UsuarioAux = @UsuarioAux`

  try {
    const pool = await getConnection()
    const request = pool.request()

    if (precio !== null) request.input('Precio', sql.Float, precio)
    if (promocion !== null) request.input('Promocion', sql.Float, promocion)
    if (fechaCompra !== null) request.input('FechaCompra', sql.DateTime2, fechaCompra)
    if (anulado !== null) request.input('Anulado', sql.Bit, anulado)
    if (estado !== null) request.input('Estado', sql.VarChar, estado)

    request.input('UsuarioAux', sql.Int, id)
    const result = await request.query(queryFacturaPatch)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: 'Record updated successfully' })
    } else {
      res.status(404).json({ msg: 'Record not found or no changes made' })
    }
  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

/* DELETE FACTURA */
export const deleteFacturaUser = async (req, res) => {
  const { id } = req.params

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.anularFacturaById)

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ msg: 'Record deleted successfully' })
    } else {
      res.status(204).json({ msg: 'Record not found' })
    }
  } catch(error){
    res.status(500).json({ error: error.message})
  }
}

/* GET */
export const getFacturaFullUser = async (req, res) => {
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



/** MIDDLEWARES**/
export const getNotFound = async (req, res, next) => {
  const { id } = req.params
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(queries.getFacturaById)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const getNotFoundUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('UsuarioAux', sql.Int, id)
      .query(queries.getFacturaUser)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}

export const getNotFoundPendiente = async (req, res, next) => {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .query(queries.getNotFoundFactura)
    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Record does not exists'})
    } else {
      next()
    }

  }catch(error){
    res.status(500).json({ error: error.message})
  }
}
