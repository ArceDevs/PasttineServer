require('dotenv').config()
import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/api-key/generate', (req, res) => {
  if (req.body.password !== process.env.API_KEY_PSW) return res.status(403).json({
    status: 'Forbidden',
    msg: 'Access denied'
  })

  const accessToken = generateAccessToken()

  res.status(200).json({
    status: 'Success',
    msg: 'API KEY generated',
    accessToken
  })
})

router.get('/test', function (req, res) {
  res.send('Working');
});

router.get('/test-db', async (req, res) => {
  try {
      const pool = await getConnection();
      const result = await pool.request()
          .query('SELECT TOP 1 * FROM Producto'); // Reemplaza 'tuTabla' con una tabla real de tu DB

      if (result.recordset.length > 0) {
          res.json({
              status: 'Success',
              data: result.recordset
          });
      } else {
          res.status(404).json({ message: 'No data found' });
      }
  } catch (error) {
      res.status(500).json({ 
          message: 'Error connecting to the database',
          error: error.message
      });
  }
});

function generateAccessToken() {
  return jwt.sign({ apiKeyPsw: process.env.API_KEY_PSW }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

export default router