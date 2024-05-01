import { getConnection, sql, nivelQueries as queries } from '../database'

/*** INSERT ***/

//INSERT INTO Niveles (Nivel)
export const createNivel = async (req, res) => {
  const { nivel } = req.body
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('Nivel', sql.VarChar, nivel)
      .query(queries.createNivel)
    res.json({ id: result.recordset[0].Id, status: 200})
  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}

/*** UPDATE ***/

//UPDATE Niveles SET Nivel = @Nivel WHERE Id = @Id
export const updateProductoById = async (req, res) => {
  const { id } = req.params
  const { nivel } = req.body
  try{
    const pool = await getConnection()
    await pool.request()
      .input('Nivel', sql.VarChar, nivel)
      .input('Id', id)
      .query(queries.updateNivelById)
    res.status(200)
  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}

/*** DELETE ***/

//DELETE Niveles WHERE Id = @Id
export const deleteNivelById = async (req, res) => {
  const { id } = req.params
  try{
    const pool = await getConnection()
    await pool.request()
      .input('Id', id)
      .query(queries.deleteNivelById)
    res.sendStatus(204)
  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}

/*** SELECT ***/
//SELECT * FROM Niveles
export const getAllNivel = async (req, res) => {
  try{
    const pool = await getConnection()
    const result = await pool.request().query(queries.getAllNivel)
    res.json(result.recordset)
  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}

//SELECT COUNT(*) FROM Niveles
export const getTotalNivel = async (req, res) => {
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .query(queries.getTotalNivel)

    res.json(result.recordset[0][''])

  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}

//SELECT * FROM Niveles WHERE Id = @Id
export const getNivelById = async (req, res) => {
  const { id } = req.params
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getNivelById)
    res.send(result.recordset[0])
  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}

//SELECT * FROM Niveles WHERE Id = @Id
export const getExists = async (req, res) => {
  const { id } = req.params
  try{
    const pool = await getConnection()
    const result = await pool.request()
      .input('Id', id)
      .query(queries.getNivelById)
    res.send(result.recordset[0])
  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}