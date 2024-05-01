export const usuarioQueries = {
  updateUsuarioDataById:
    `UPDATE Usuario SET Username = @Username, Nombre = @Nombre, Apellido = @Apellido, Telefono = @Telefono, FechaNac = @FechaNac WHERE Id = @Id`,
  updateFullById:
    `UPDATE Usuario SET Username = @Username, Email = @Email, Auth = @Auth, Nivel = @Nivel, Nombre = @Nombre, Apellido = @Apellido, Telefono = @Telefono, FechaNac = @FechaNac WHERE Id = @Id`,
  updatePfpById:
    `UPDATE Usuario SET PFP = @PFP WHERE Id = @Id`,
  updatePasswordById:
    `UPDATE Usuario SET Contrasena = @Contrasena WHERE Id = @Id`,
  updatePasswordEmail:
    `UPDATE Usuario SET Contrasena = @Contrasena WHERE Email = @Email`,
  deleteUsuarioById:
    `UPDATE Usuario SET Eliminado = @Eliminado WHERE Id = @Id`,
  deleteUsuarioByIdFinal:
    `DELETE FROM Usuario WHERE Id = @Id`,
  getAllUsuario:
    `SELECT Id, Username, Email, Auth, Nivel, Nombre, Apellido, Telefono, FechaNac, PFP FROM Usuario WHERE Eliminado = 0`,
  getUsuarioById:
    `SELECT Id, Username, Email, Auth, Nivel, Nombre, Apellido, Telefono, FechaNac, PFP FROM Usuario WHERE Id = @Id AND Eliminado = 0`,
  getUsuarioEmail:
    `SELECT Id, Username, Email, Auth, Nivel, Nombre, Apellido, Telefono, FechaNac, PFP FROM Usuario WHERE Email = @Email AND Eliminado = 0`,
  getTotalUsuario:
    `SELECT COUNT(*) FROM Usuario`
}

export const authQueries = {
  createUsuario: 
    `INSERT INTO Usuario (Username, Contrasena, Email, UltimaIp, Nombre, Apellido)
      OUTPUT INSERTED.Id 
      VALUES (@Username, @Contrasena, @Email, @UltimaIp, @Nombre, @Apellido)`,
  getUsuarioByEmail:
    `SELECT * FROM Usuario WHERE Email = @Email AND Eliminado = 0`,
  getUsuarioById:
    `SELECT * FROM Usuario WHERE Id = @Id AND Eliminado = 0`,
  getUltimaIPById:
    `SELECT UltimaIP FROM Usuario WHERE Id = @Id AND Eliminado = 0`,
  getAuthById:
    `SELECT Auth FROM Usuario WHERE Id = @Id AND NOT Auth IS NULL AND Eliminado = 0`,
  updateUltimaConexionById:
    `UPDATE Usuario SET UltimoAcceso = GETUTCDATE(), UltimaIP = @UltimaIP WHERE Id = @Id AND Eliminado = 0`,
  updateAuthById:
    `UPDATE Usuario SET Auth = @Auth WHERE Id = @Id`,
  deleteAuthById:
    `UPDATE Usuario SET Auth = @Auth WHERE Id = @Id`,
  getConflict:
    `SELECT Email FROM Usuario WHERE Email = @Email`
}

export const productoQueries = {
  createProducto: 
    `INSERT INTO Producto (Nombre, Precio, IVA, Stock, CategoriaAux, Rating, Img, Descripcion, Signo) 
      OUTPUT INSERTED.Id 
      VALUES (@Nombre, @Precio, @IVA, @Stock, @CategoriaAux, @Rating, @Img, @Descripcion, @Signo)`,
  updateFullProductoById: 
    `UPDATE Producto 
    SET Nombre = @Nombre, Precio = @Precio, IVA = @IVA, Stock = @Stock, CategoriaAux = @CategoriaAux, Rating = @Rating, Img = @Img, Descripcion = @Descripcion, Favorito = @Favorito, Signo = @Signo
    WHERE Id = @Id AND Eliminado = 0`,
  deleteProductoById: 
    `UPDATE Producto SET Eliminado = @Eliminado WHERE Id = @Id AND Eliminado = 0`,
  deleteProductoByIdFinal: 
    `DELETE FROM Producto WHERE Id = @Id`,
  getAllProducto:
    `SELECT * FROM Producto WHERE Eliminado = 0 ORDER BY Producto.Id ASC OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY`,
  getTotalProducto: 
    `SELECT COUNT(*) FROM Producto WHERE Eliminado = 0 ORDER BY Rating DESC`,
  getProductoById: 
    `SELECT * FROM Producto WHERE Id = @Id AND Eliminado = 0`,
  getProductoIngredientesById: 
    `SELECT I.Id, I.Nombre, I.Detalles, I.GrasasVegetales, I.GrasasSaturadas, I.Azucares FROM Producto P
    RIGHT JOIN Producto_Ingrediente P_I ON P.Id = P_I.ProductoAux
    RIGHT JOIN Ingredientes I ON P_I.IngredienteAux = I.Id
    WHERE P.Eliminado = 0 AND P.Id = @Id
    ORDER BY I.Id`,
  getProductoOfertasById: 
    `SELECT O.IdBanner, O.Nombre, O.Tipo, O.Descuento, O.ProductoAux, O.Img, O.Banner, O.Video, O.Patrocinador, O.FechaFin FROM Producto P
    RIGHT JOIN Ofertas O ON P.Id = O.ProductoAux
    WHERE O.FechaInicio <= GETDATE() AND O.FechaFin >= GETDATE() AND P.Eliminado = 0 AND P.Id = @Id
    ORDER BY O.IdBanner`,
  getProductoAlergenosById: 
    `SELECT A.Id, A.Nombre, A.Img FROM Producto P
    RIGHT JOIN Producto_Ingrediente P_I ON P.Id = P_I.ProductoAux
    RIGHT JOIN Ingredientes I ON P_I.IngredienteAux = I.Id
    RIGHT JOIN Alergenos A ON I.AlergenoAux = A.Id
    WHERE P.Eliminado = 0 AND P.Id = @Id
    GROUP BY A.Id, A.Nombre, A.Img
    ORDER BY A.Id`
}

export const nivelesQueries = {
  createNivel:
    `INSERT INTO Niveles (Nivel) 
      OUTPUT INSERTED.Id 
      VALUES (@Nivel)`,
  updateNivelById:
    `UPDATE Niveles SET Nivel = @Nivel WHERE Id = @Id`,
  deleteNivelById:
    `DELETE FROM Niveles WHERE Id = @Id`,
  getAllNivel:
    `SELECT * FROM Niveles`,
  getTotalNivel:
    `SELECT COUNT(*) FROM Niveles`,
  getNivelById:
    `SELECT * FROM Niveles WHERE Id = @Id`
}

export const ingredientesQueries = {
  createIngrediente: 
    `INSERT INTO Ingredientes (Nombre, Descripcion) 
      OUTPUT INSERTED.Id 
      VALUES (@Nombre, @Descripcion)`,
  updateIngredienteById: 
    `UPDATE Ingredientes SET Nombre = @Nombre, Descripcion = @Descripcion WHERE Id = @Id`,
  deleteIngredienteById: 
    `DELETE FROM Ingredientes WHERE Id = @Id`,
  getAllIngredientes:
    `SELECT * FROM Ingredientes`,
  getIngredienteById: 
    `SELECT * FROM Ingredientes WHERE Id = @Id`
}

export const categoriasQueries = {
  createCategorias: 
    `INSERT INTO Categoria (Nombre) 
      OUTPUT INSERTED.Id 
      VALUES (@Nombre)`,
  updateCategoriasById: 
    `UPDATE Categoria SET Nombre = @Nombre WHERE Id = @Id`,
  deleteCategoriasById: 
    `DELETE FROM Categoria WHERE Id = @Id`,
  getAllCategorias:
    `SELECT Id, Nombre FROM Categoria`,
  getCategoriasById: 
    `SELECT Id, Nombre FROM Categoria WHERE Id = @Id`,
  getTotalCategorias:
    `SELECT COUNT(*) FROM Categoria`
}

export const alergenosQueries = {
  createAlergeno: 
    `INSERT INTO Alergenos (Nombre, Img) 
      OUTPUT INSERTED.Id 
      VALUES (@Nombre, @Img)`,
  updateAlergenoById: 
    `UPDATE Alergenos SET Nombre = @Nombre, Img = @Img WHERE Id = @Id`,
  deleteAlergenoById: 
    `DELETE FROM Alergenos WHERE Id = @Id`,
  getAllAlergenos:
    `SELECT Id, Nombre, Img FROM Alergenos`,
  getAlergenoById: 
    `SELECT Id, Nombre, Img FROM Alergenos WHERE Id = @Id`,
  getTotalAlergenos:
    `SELECT COUNT(*) FROM Alergenos`
}

export const contactoQueries = {
  createContato: 
    `INSERT INTO Contacto (Asunto, Mensaje, NombreCompleto, Email, Telefono) 
      OUTPUT INSERTED.Id
      VALUES (@Asunto, @Mensaje, @NombreCompleto, @Email, @Telefono)`,
  updateContacto: 
    `UPDATE Contacto 
      SET Asunto = @Asunto, Mensaje = @Mensaje, NombreCompleto = @NombreCompleto, Email = @Email, Telefono = @Telefono 
      WHERE Id = @Id`,
  deleteContacto: 
    `DELETE FROM Contacto WHERE Id = @Id`,
  getContacto: 
    `SELECT * FROM Contacto WHERE Id = @Id`
}

export const ofertasQueries = {
  createOferta:
    `INSERT INTO Ofertas (Tipo, Descuento, ProductoAux, Img, Video, Banner, Patrocinador, FechaInicio, FechaFin)
      OUTPUT INSERTED.IdBanner 
      VALUES (@Tipo, @Descuento, @ProductoAux, @Img, @Video, @Banner, @Patrocinador, @FechaInicio, @FechaFin)`,
  updateOfertaById:
    `UPDATE Ofertas
     SET Tipo = @Tipo, Descuento = @Descuento, ProductoAux = @ProductoAux, Img = @Img,
         Video = @Video, Banner = @Banner, Patrocinador = @Patrocinador,
         FechaInicio = @FechaInicio, FechaFin = @FechaFin
     WHERE IdBanner = @IdBanner`,
  deleteOfertaById: 
    `UPDATE Producto SET Eliminado = 1 WHERE IdBanner = @IdBanner`,
  deleteOfertaByIdFinal:
    `DELETE FROM Ofertas WHERE IdBanner = @IdBanner`,
  getAllOfertas:
    `SELECT * FROM Ofertas`,
  getOfertaById:
    `SELECT * FROM Ofertas WHERE IdBanner = @IdBanner`,
  getTotalOfertas:
    `SELECT COUNT(*) FROM Ofertas WHERE FechaInicio <= GETDATE() AND FechaFin >= GETDATE()`,
  getOfertasBanner:
    `SELECT * FROM Ofertas 
    LEFT JOIN Producto P ON Ofertas.ProductoAux = P.Id
    WHERE Banner != '' AND FechaInicio <= GETDATE() AND FechaFin >= GETDATE() ORDER BY IdBanner DESC`,
  getOfertasVideo:
    `SELECT * FROM Ofertas WHERE Video != '' AND FechaInicio <= GETDATE() AND FechaFin >= GETDATE()`,
  getOfertasImg:
    `SELECT * FROM Ofertas WHERE Img != '' AND FechaInicio <= GETDATE() AND FechaFin >= GETDATE()`,
  getOfertasByProductoAux:
    `SELECT * FROM Ofertas WHERE ProductoAux = @ProductoAux AND FechaInicio <= GETDATE() AND FechaFin >= GETDATE()`
}

export const carritoQueries = {
  createCarrito: 
    `INSERT INTO Carrito (UsuarioAux, Precio, Promocion) 
      OUTPUT INSERTED.Id 
      VALUES (@UsuarioAux, @Precio, @Promocion)`,
  createCarritoUser: 
    `INSERT INTO Carrito (UsuarioAux) 
      OUTPUT INSERTED.Id 
      VALUES (@UsuarioAux)`,
  updateCarritoById: 
    `UPDATE Carrito SET UsuarioAux = @Usuario, Precio = @Precio, Promocion = @Promocion WHERE Id = @Id`,
  updateCarritoUser: 
    `UPDATE Carrito SET Precio = @Precio, Promocion = @Promocion WHERE UsuarioAux = @UsuarioAux`,
  deleteCarritoById: 
    `DELETE FROM Carrito WHERE Id = @Id`,
  deleteCarritoUser: 
    `DELETE FROM Carrito WHERE UsuarioAux = @UsuarioAux`,
  getCarritoById: 
    `SELECT * FROM Carrito WHERE Id = @Id`,
  getCarritoUser:
    `SELECT * FROM Carrito 
    WHERE UsuarioAux = @UsuarioAux`
}

export const detallesCarritoQueries = {
  createDetallesCarrito:
    `INSERT INTO DetallesCarrito (ProductoAux, Cantidad, PrecioDetalle, CarritoAux, RacionComprada)
    OUTPUT INSERTED.IdDetalle
    VALUES (@ProductoAux, @Cantidad, @PrecioDetalle, @CarritoAux, @RacionComprada)`,
  updateDetallesCarritoById:
    `UPDATE DetallesCarrito
      SET Cantidad = @Cantidad, PrecioDetalle = @PrecioDetalle, CarritoAux = @CarritoAux, RacionComprada = @RacionComprada
      WHERE IdDetalle = @IdDetalle`,
  updateDetallesCarrito:
    `UPDATE DetallesCarrito D
      LEFT JOIN Carrito C ON D.CarritoAux = C.Id
      SET Cantidad = @Cantidad, PrecioDetalle = @PrecioDetalle, CarritoAux = @CarritoAux, RacionComprada = @RacionComprada
      WHERE ProductoAux = @ProductoAux AND C.UsuarioAux = @UsuarioAux`,
  getDetallesById: 
    `SELECT * FROM DetallesCarrito WHERE IdDetalle = @IdDetalle`,
  getDetallesCart: 
    `SELECT * FROM DetallesCarrito D 
      LEFT JOIN Producto P ON D.ProductoAux = P.Id
      WHERE D.CarritoAux = @CarritoAux`,
  getDetallesUser: 
    `SELECT D.IdDetalle, D.ProductoAux, D.Cantidad, D.PrecioDetalle, D.CarritoAux, RacionComprada FROM DetallesCarrito D
      LEFT JOIN Carrito C ON D.CarritoAux = C.Id
      LEFT JOIN 
        (SELECT 
            Ofertas.ProductoAux AS Id_Producto_Oferta, 
            CONCAT('[', STRING_AGG(
                CONCAT(
                    '{"OfertaId":"', Ofertas.Id, 
                    '","Descuento":"', Descuento, 
                    '","Tipo":"', Tipo, 
                    '","FechaInicio":"', CONVERT(VARCHAR, FechaInicio, 120), 
                    '","Img":"', Ofertas.Img, 
                    '","Patrocinador":"', Patrocinador, 
                    '"}'
                ), ', '), ']'
            ) AS OfertasInfo
        FROM Ofertas WHERE FechaInicio <= GETDATE() AND FechaFin >= GETDATE() AND Tipo IN ('%','abs') GROUP BY Ofertas.ProductoAux)
      O ON P.Id = O.Id_Producto_Oferta
      WHERE UsuarioAux = @UsuarioAux`,
  deleteDetallesCarritoById:
    `DELETE FROM DetallesCarrito WHERE IdDetalle = @IdDetalle`,
  deleteDetallesCarritoByIdCarrito:
    `DELETE FROM DetallesCarrito WHERE CarritoAux = @CarritoAux`,
  deleteDetallesCarrito:
    `DELETE FROM DetallesCarrito WHERE ProductoAux = @ProductoAux AND CarritoAux = @CarritoAux`,
  deleteDetallesCarritoFull:
    `DELETE FROM DetallesCarrito
    WHERE CarritoAux IN (SELECT Id FROM Carrito WHERE UsuarioAux = @UsuarioAux)`,
  getDetallesCarritoById:
    `SELECT * FROM DetallesCarrito WHERE IdDetalle = @IdDetalle`,
  getConflictDetalles:
    `SELECT * FROM DetallesCarrito
      WHERE ProductoAux = @ProductoAux AND CarritoAux = @CarritoAux`,
}

export const errorQueries = {
  createError: 
    `INSERT INTO Error (Ruta, Metodo, Error, Mensaje, UsuarioAux, Navegador, Ip) 
      OUTPUT INSERTED.Id 
      VALUES (@Ruta, @Metodo, @Error, @Mensaje, @UsuarioAux, @Navegador, @Ip)`,
  updateErrorById: 
    `UPDATE Error SET Ruta = @Ruta, Metodo = @Metodo, Error = @Error, Mensaje = @Mensaje, UsuarioAux = @UsuarioAux, Navegador = @Navegador, Ip = @Ip WHERE Id = @Id`,
  deleteError: 
    `DELETE FROM Error WHERE Id = @Id`,
  getErrorById: 
    `SELECT * FROM Error WHERE Id = @Id`
}

export const datosCompraQueries = {
  createDatosCompraUser: 
    `INSERT INTO DatosCompra (UsuarioAux) VALUES (@UsuarioAux)`,
  updateDatosCompraById: 
    `UPDATE DatosCompra SET DetallesFacturaAux = @DetallesFacturaAux, Provincia = @Provincia, Direccion = @Direccion, Direccion2 = @Direccion2, Cp = @Cp, Telefono = @Telefono, Recordar = @Recordar WHERE Id = @Id`,
  updateDatosCompraUser: 
    `UPDATE DatosCompra SET DetallesFacturaAux = @DetallesFacturaAux, Provincia = @Provincia, Direccion = @Direccion, Direccion2 = @Direccion2, Cp = @Cp, Telefono = @Telefono, Recordar = @Recordar WHERE UsuarioAux = @UsuarioAux`,
  deleteDatosCompra: 
    `DELETE FROM DatosCompra WHERE Id = @Id`,
  getDatosCompraById: 
    `SELECT * FROM DatosCompra WHERE Id = @Id`,
  getDatosCompraUser: 
    `SELECT * FROM DatosCompra WHERE UsuarioAux = @UsuarioAux`
}

export const facturaQueries = {
  createFactura:
    `INSERT INTO Factura (UsuarioAux, Precio, Promocion)
      OUTPUT INSERTED.Id 
      SELECT UsuarioAux, Precio, Promocion
      FROM Carrito C
      WHERE C.UsuarioAux = @UsuarioAux`,
  updateFacturaById:
    `UPDATE Factura
      SET Precio = @Precio, Promocion = @Promocion, Estado = @Estado, FechaCompra = @FechaCompra
      WHERE Id = @Id`,
  updateFacturaUser:
    `UPDATE Factura
      SET Precio = @Precio, Promocion = @Promocion, Estado = @Estado, FechaCompra = @FechaCompra
      WHERE UsuaioAux = @UsuarioAux`,
  deleteFacturaById:
    `UPDATE Factura SET Anulado = 1 WHERE Id = @Id`,
  anularFacturaById:
    `UPDATE Factura SET Anulado = 1 WHERE Id = @Id`,
  getFacturaById:
    `SELECT * FROM Factura WHERE Id = @Id`,
  getFacturaUser:
    `SELECT * FROM Factura WHERE UsuarioAux = @UsuarioAux`,
  getNotFoundFactura:
    `SELECT * FROM Factura WHERE Estado = 'Pendiente'`,
}

export const detallesFacturaQueries = {
  createDetallesFactura:
    `INSERT INTO DetallesFactura (ProductoAux, Cantidad, PrecioFactura, FacturaAux, RacionComprada)
      SELECT ProductoAux, Cantidad, PrecioDetalle AS PrecioFactura, @FacturaAux, RacionComprada
      FROM DetallesCarrito D
      LEFT JOIN Carrito C ON D.CarritoAux = C.Id
      WHERE C.UsuarioAux = @UsuarioAux`,
  updateDetallesFacturaById:
    `UPDATE DetallesFactura
      SET PrecioFactura = @PrecioFactura, Promocion = @Promocion, Estado = @Estado, FechaCompra = @FechaCompra
      WHERE Id = @Id`,
  getDetallesFacturaByFacturaAux:
    `SELECT * FROM DetallesFactura D
    LEFT JOIN Producto P ON D.ProductoAux = P.Id
    WHERE FacturaAux = @FacturaAux`,
  getDetallesFacturaById:
    `SELECT * FROM DetallesFactura WHERE Id = @Id`
}

export const codesQueries = {
  createCode:
    `INSERT INTO ConfirmacionCodigo (UsuarioAux, Email, Codigo, NumIntentos, TotalIntentos, FechaIntento)
      OUTPUT INSERTED.IdCodigo 
      VALUES (@UsuarioAux, @Email, @Codigo, @NumIntentos, @TotalIntentos, GETDATE())`,
  updateCodeById:
    `UPDATE ConfirmacionCodigo 
      SET UsuarioAux = @UsuarioAux, Email = @Email, Codigo = @Codigo, 
      NumIntentos = NumIntentos + 1, 
      TotalIntentos = TotalIntentos + 1, 
      FechaIntento = GETDATE(),
      WHERE IdCodigo = @IdCodigo`,
  deleteCodeById:
    `DELETE FROM ConfirmacionCodigo WHERE IdCodigo = @IdCodigo`,
  getCodeById:
    `SELECT * FROM ConfirmacionCodigo WHERE IdCodigo = @IdCodigo`,
  getCodeEmail:
    `SELECT * FROM ConfirmacionCodigo WHERE Email = @Email`
}