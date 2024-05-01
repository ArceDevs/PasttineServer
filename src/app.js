if (process.env.NODE_ENV !== 'production') { require('dotenv').config }

import express from 'express'
import config from './config'
import cors from 'cors'
import flash from 'express-flash'
import session from 'express-session'
import passport from 'passport'
import methodOverride from 'method-override'
import jwt from 'jsonwebtoken'
import path from 'path'

import MSSQLStore from 'connect-mssql-v2';

//Routes
import usersRoutes from './routes/users.routes'
import contactRoutes from './routes/contacto.routes'
import productRoutes from './routes/products.routes'
import alergenosRoutes from './routes/alergenos.routes'
import categoriasRoutes from './routes/categorias.routes'
import errorRoutes from './routes/error.routes'
import ofertasRoutes from './routes/ofertas.routes'
import cartRoutes from './routes/cart.routes'
import invoiceRoutes from './routes/invoice.routes'
import purchaseRoutes from './routes/purchase.routes'
import codeRoutes from './routes/codes.routes'
import authRoutes from './routes/auth.routes'
import ApiKey from './routes/apikey.route'

const app = express()

/*******************SETTINGS**********************/
app.set('port', config.port)
//middlewares
app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({ extended: false }))
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
//auth middlewares
app.use(flash())

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MSSQLStore({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  }),
  cookie: { maxAge: 3600000 }
}
app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

/*******************PUBLIC**********************/
app.use('/media', express.static(path.join(__dirname, 'media')))
//API KEY
app.use(ApiKey)

//Midleware API KEY
app.use((req, res, next) =>{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.status(401).json({ status: 'Unauthorized', msg: 'Access denied' })
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ status: 'Forbidden', msg: 'Access denied' })
    next()
    // console.log('Token authenticated')
  })
})

app.use(authRoutes)

/*******************PUBLIC**********************/

// app.use((req, res, next) => {
//   if (req.isAuthenticated()){
//     next()
//     console.log('User logged')
//   } else {
//     res.status(401).json({ 
//       status: 'Unauthorized',
//       msg: 'User is not logged in'
//     })
//   }
  
// })


//hacer get publicos y lo demas privado (NO USERS ni ERRORS)
app.use(productRoutes)
app.use(ofertasRoutes)
app.use(alergenosRoutes)
app.use(categoriasRoutes)
app.use(cartRoutes)
app.use(purchaseRoutes)
app.use(contactRoutes)
app.use(invoiceRoutes)
app.use(errorRoutes)
app.use(codeRoutes)
app.use(usersRoutes)


// //in case route does not exist
// app.use((req, res, next) => {
//   const err = new Error('Not found') 
//   err.status = 404
//   next(err)
// })


// //error handler 
// app.use((err, req, res, next) => {
//   if (err) {
//     res.status(err.status || 500)
//       .json({ 
//         error: 
//           {
//             status: err.status || 500, 
//             msg: err.message
//           }
//       })
//   }

// })



export default app