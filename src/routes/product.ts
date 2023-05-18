import express from 'express'
import { createProduct, getProducts, getProductsById } from '../controller/product'

const productRoutes = express.Router()


productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProductsById)
productRoutes.post('/', createProduct)

export default productRoutes
