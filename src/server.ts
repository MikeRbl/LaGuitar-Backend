import express from 'express'
import router from './router'
import db from './config/db'
import cors from 'cors'


async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log("Conexion Exitosa");
    } catch (error) {
        console.log(error);
        console.log("Hubo un error al conectar");  
    }
}
connectDB()

const server = express()

server.use(cors())

server.use(express.json())

server.use('/Api/products', router)

export default server

