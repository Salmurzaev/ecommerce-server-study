import express from 'express'
import { createOrder } from '../controller/order';

const orderRoutes = express.Router()


// orderRoutes.get('/', getProducts)
// orderRoutes.get('/:id', getProductsById)
orderRoutes.post('/', createOrder)

export default orderRoutes
