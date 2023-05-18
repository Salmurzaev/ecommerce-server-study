import { Request, Response } from 'express'
import { IProduct } from '../types'
import Product from '../models/product'

type CreateProductRequestType = Pick<IProduct, 'image' | 'name' | 'description' | 'price'>

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { image, name, price, description }: CreateProductRequestType = req.body
    const product = await Product.create({
      image,
      name,
      price,
      description
    })
    res.send(product)
  } catch (error) {
    console.log(error, 'Something wrong while creating Product')
    res.send({ message: 'Something wrong while creating Product' })
    throw error
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({})
    res.send(products)
  } catch (error) {
    console.log(error, 'Something wrong while getting Products')
    res.send({ message: 'Something wrong while getting Products' })
    throw error
  }
}

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.send(product)
  } catch (error) {
    console.log(error, 'Something wrong while getting Product')
    res.send({ message: 'Something wrong while getting Product' })
    throw error
  }
}
