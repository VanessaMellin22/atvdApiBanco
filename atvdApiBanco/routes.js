import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()

routes.get('/', async (req, res)=>{
   try{
        const { recordset } =  await pool.query`select * from Registros`
        return res.status(200).json(recordset)
   }
   catch(error){
        return res.status(501).json('registros nao encontrados')
   }
})

routes.get('/chamado/:id', async (req, res)=>{
    try{
        const { id } = req.params 
        const { recordset } =  await pool.query`SELECT * from Registros WHERE id = ${ id }`
         return res.status(200).json(recordset)
    }
    catch(error){
         return res.status(501).json('id nao identificado')
    }
 })
 
routes.post('/chamado/novo', async (req, res)=>{
    try{
        const { data, nome, descricao} = req.body;
        await pool.query`insert into Registros values(${data},${nome},${descricao} )`
        return res.status(201).json(`ok`)
    }

    catch(error){
        return res.status(501).json('erro ao inserir chamado')
    }
})

export default routes