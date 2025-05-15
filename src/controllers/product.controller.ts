import { handleError } from "../utils/utils"
import { Request, Response } from "express"
import { isValidObjectId } from "../utils/utils"
import { IProduct } from "../types/product"
import  Product  from '../models/product.model'

// Get all product
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
        // Use lean() for better performance when you don't
        // need full mongoose documents
    const products = await Product.find().lean()
    res.status(200).json(products)
  } catch (error) {
    handleError(res, error)
  }
}

//Create a  new product
export const createProduct = async (
    req: Request, res: Response): Promise<void> => {
        try {
            const { name, description, sku, price, quantity } = req.body
            const existingsku = await Product.findOne({ sku }).lean()
            if (existingsku) {
                res.status(409).json({ message: 'Name already exists' })
                return
            }
    const product = new Product({ name, description, sku, price, quantity})

                const savedProduct = await product.save()
    const { _id, name: ProductName, description: ProductDescription, sku:ProductSku, price:productPrice, quantity:productQuantity} = savedProduct
    res.status(201).json({ _id,name: ProductName , description: ProductDescription, sku:ProductSku , price:productPrice, productQuantity})
        } catch (error) {
            handleError(res, error)
        }
    }

    // Get product by ID
export const getProductById = async ( req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return
    const product = await Product.findById(id).lean()
    if (!product) {
      res.status(400).json({ message: 'Product not found' })
      return
    }
    res.status(200).json(product) 
}catch (error) {
    handleError(res, error)
  }
}

// Update product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { name,description, sku, price, quantity} = req.body
    if (!isValidObjectId(id, res)) return

    if (!name && !description && !sku && !price && !quantity) {
      res.status(400).json({ message: 'No update fields provided' })
      return
    }

        //Build update object dynamically
    const updateData: Partial<IProduct> = {} 
    if (name) updateData.name = name
    if (description) updateData.description= description
    if (sku) updateData.sku= sku
    if (price) updateData.price= price
    if (quantity) updateData.quantity= quantity

        // if name is being updated, check for duplicates
    if (name) {
      const nameExists = await Product.findOne({
        name,
        _id: { $ne: id },
      })
        .lean()
      if (nameExists) {
        res.status(400).json({ message: 'Name already in use' })
        return
      }
    }

    const updateProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .lean()

    if (!updateProduct) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    res.status(200).json(updateProduct)
  } catch (error) {
    handleError(res, error)
  }
}

//Delete product
    export const deleteProduct = async (req: Request , res: Response): Promise<void> => {
  try {
    const { id } = req.params 
    if (!isValidObjectId(id, res)) return

    const deletedProduct = await Product.findByIdAndDelete(id).lean()
    if (!deletedProduct) {
      res.status(400).json({ message: 'Product not found' })
      return
    }

    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    handleError(res, error)
  }
}