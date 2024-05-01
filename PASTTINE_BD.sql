CREATE TABLE Usuario
(
Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
Username VARCHAR(50) NOT NULL,
Contrasena VARCHAR(1000) NOT NULL,
Email VARCHAR(100) NOT NULL,
Auth VARCHAR(500),
Nivel INT DEFAULT 3,
Nombre VARCHAR(50),
Apellido VARCHAR(50),
Telefono VARCHAR(25),
FechaNac VARCHAR(10),
PFP VARCHAR(100),
Eliminado BIT DEFAULT 0,
UltimoAcceso DATETIME2 DEFAULT GETUTCDATE(),
UltimaIP VARCHAR(39),
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
)

CREATE TABLE Niveles
(
Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
Nivel VARCHAR (50) NOT NULL
)

INSERT INTO Niveles (Nivel) VALUES
('Administrador'),
('Desarrollador'),
('Cliente'),
('Comercial'),
('Proveedor')


CREATE TABLE Alergenos (
Id INT IDENTITY(1,1) PRIMARY KEY,
Nombre VARCHAR(255),
Img VARCHAR(255)
)

INSERT INTO Alergenos (Nombre, Img) VALUES
('Gluten', 'media/images/alergenos/1.png'),
('Frutos Secos', 'media/images/alergenos/2.png'),
('Crustáceos', 'media/images/alergenos/3.png'),
('Apio', 'media/images/alergenos/4.png'),
('Huevos', 'media/images/alergenos/5.png'),
('Mostaza', 'media/images/alergenos/6.png'),
('Pescado', 'media/images/alergenos/7.png'),
('Sésamo', 'media/images/alergenos/8.png'),
('Cacahuetes', 'media/images/alergenos/9.png'),
('Sulfitos', 'media/images/alergenos/10.png'),
('Soja', 'media/images/alergenos/11.png'),
('Altramuces', 'media/images/alergenos/12.png'),
('Leche', 'media/images/alergenos/13.png'),
('Moluscos', 'media/images/alergenos/14.png');


CREATE TABLE Categoria (
Id INT IDENTITY(1,1) PRIMARY KEY,
Nombre VARCHAR(255)
)

INSERT INTO Categoria (Nombre) VALUES
('Bebidas'),
('Bollos y Panes Dulces'),
('Galletas y Dulces'),
('Pasteles y Tartas'),
('Sandwiches y Bocadillos'),
('Ensaladas y Opciones Ligeras'),
('Helados y Sorbetes'),
('Otros')

CREATE TABLE Producto
(
Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
Nombre VARCHAR (50) NOT NULL,
Precio FLOAT NOT NULL,
IVA FLOAT DEFAULT 14,
Signo VARCHAR(10) DEFAULT '€',
Peso VARCHAR(10) DEFAULT 0,
Raciones FLOAT DEFAULT 0,
Sabores VARCHAR(150),
Stock INT DEFAULT 0,
Rating INT DEFAULT 0,
Favorito BIT DEFAULT 0,
Img VARCHAR(255),
Descripcion VARCHAR(MAX),
CategoriaAux INT DEFAULT 1,
Eliminado BIT DEFAULT 0,
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
FOREIGN KEY (CategoriaAux) REFERENCES Categoria(Id)
)

CREATE TABLE Ofertas (
IdBanner INT PRIMARY KEY IDENTITY(1,1),
Nombre VARCHAR(255),
Tipo VARCHAR(50) NOT NULL,
Descuento FLOAT,
ProductoAux INT,
Img VARCHAR(500),
Video VARCHAR(500),
Banner VARCHAR(500),
Patrocinador VARCHAR(500),
Anotacion VARCHAR(500),
FechaInicio DATETIME2,
FechaFin DATETIME2,
Eliminado BIT DEFAULT 0,
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
)

CREATE TABLE Ingredientes (
Id INT IDENTITY(1,1) PRIMARY KEY,
AlergenoAux INT,
Nombre VARCHAR(255),
Detalles VARCHAR(MAX),
GrasasVegetales FLOAT,
GrasasSaturadas FLOAT,
Azucares FLOAT,
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
FOREIGN KEY (AlergenoAux) REFERENCES Alergenos(Id)
)

CREATE TABLE Producto_Ingrediente (
Id INT IDENTITY(1,1) PRIMARY KEY,
ProductoAux INT,
IngredienteAux INT,
Cantidad VARCHAR(255),
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
FOREIGN KEY (ProductoAux) REFERENCES Producto(Id),
FOREIGN KEY (IngredienteAux) REFERENCES Ingredientes(Id)
)

CREATE TABLE Carrito
(
Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
UsuarioAux INT NOT NULL,
CONSTRAINT FK_Id_Carrito FOREIGN KEY (UsuarioAux) REFERENCES Usuario(Id),
Precio FLOAT NOT NULL DEFAULT 0,
Promocion FLOAT DEFAULT 0,
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
)

CREATE TABLE DetallesCarrito
(
IdDetalle INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
ProductoAux INT NOT NULL,
CONSTRAINT FK_Id_DetallesCarrito FOREIGN KEY (ProductoAux) REFERENCES Producto(Id),
Cantidad INT NOT NULL,
PrecioDetalle FLOAT NOT NULL,
CarritoAux INT NOT NULL,
RacionComprada INT,
SaborComprado VARCHAR(150),
CONSTRAINT FK_CarritoAux_DetallesCarrito FOREIGN KEY (CarritoAux) REFERENCES Carrito(Id),
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
)



CREATE TABLE Factura
(
Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
UsuarioAux INT NOT NULL,
CONSTRAINT FK_Id_Factura FOREIGN KEY (UsuarioAux) REFERENCES Usuario(Id),
Precio FLOAT NOT NULL,
Promocion FLOAT DEFAULT 0,
FechaCompra DATETIME2,
Anulado BIT DEFAULT 0,
Estado VARCHAR(50) DEFAULT 'Pendiente',
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
)


CREATE TABLE DetallesFactura
(
IdFactura INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
ProductoAux INT NOT NULL,
CONSTRAINT FK_Id_DetallesFactura FOREIGN KEY (ProductoAux) REFERENCES Producto(Id),
Cantidad INT NOT NULL,
PrecioFactura FLOAT NOT NULL,
FacturaAux INT NOT NULL,
RacionComprada INT,
SaborComprado VARCHAR(150),
CONSTRAINT FK_FacturaAux_DetallesFactura FOREIGN KEY (FacturaAux) REFERENCES Factura(Id)
)

CREATE TABLE DatosCompra
(
Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
UsuarioAux INT NOT NULL,
CONSTRAINT FK_Id_DatosCompra FOREIGN KEY (UsuarioAux) REFERENCES Usuario(Id),
FacturaAux VARCHAR(255),
Provincia VARCHAR(255),
Direccion VARCHAR(255),
Direccion2 VARCHAR(255),
Cp INT,
Telefono VARCHAR(25),
Recordar BIT DEFAULT 0
)

CREATE TABLE Contacto
(
Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
Asunto VARCHAR(200) NOT NULL,
Mensaje VARCHAR(MAX) NOT NULL,
NombreCompleto VARCHAR(100) NOT NULL,
Email VARCHAR(100) NOT NULL,
Telefono VARCHAR(25),
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
)

CREATE TABLE Error
(
Id INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
Ruta VARCHAR(100) NOT NULL,
Metodo VARCHAR(100) NOT NULL,
Error VARCHAR(MAX) NOT NULL,
Mensaje VARCHAR(255),
UsuarioAux INT,
Navegador VARCHAR(100) NOT NULL,
Ip VARCHAR(39) NOT NULL,
FechaCreacion DATETIME2 DEFAULT GETUTCDATE()
)

CREATE TABLE ConfirmacionCodigo (
IdCodigo INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
UsuarioAux INT,
Email VARCHAR(100) NOT NULL,
Codigo VARCHAR(100) NOT NULL,
NumIntentos INT DEFAULT 0,
TotalIntentos INT DEFAULT 0,
FechaIntento DATETIME2 DEFAULT GETUTCDATE()
)

CREATE TABLE sessions {
  sid NVARCHAR(255) INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
  session NVARCHAR(MAX) NOT NULL,
  expires DATETIME NOT NULL
}


--INDICES

CREATE INDEX idx_producto_precio ON Producto(Precio)
CREATE INDEX idx_producto_categoriaaux ON Producto(CategoriaAux)
CREATE INDEX idx_producto_nombre ON Producto(Nombre)
CREATE INDEX idx_producto_ingrediente_productoaux ON Producto_Ingrediente(ProductoAux)
CREATE INDEX idx_ingrediente_alergenoaux ON Ingredientes(AlergenoAux)
CREATE INDEX idx_alergenos_nombre ON Alergenos(Nombre)

