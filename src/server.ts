import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectToDatabase from './db'
import productRoutes from './routes/product'
import orderRoutes from './routes/order'
import { webhookHandler } from './webhook'
import cors from 'cors'


const app = express()
app.use(cors())

app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler)



app.use(express.json())

connectToDatabase()

app.get('/te', (req, res) => {
  res.send('pong')
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Started ${PORT}`)
})
