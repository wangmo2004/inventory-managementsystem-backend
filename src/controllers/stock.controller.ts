import { Request, Response } from 'express'
import Stock from '../models/stock.model'
import { IStock } from '../types/stock'
import { isValidObjectId, handleError } from '../utils/utils'

// Get all stocks
export const getStocks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stocks = await Stock.find()
      .populate('product', 'name')
      .lean()

    res.status(200).json(stocks)
  } catch (error) {
    handleError(res, error)
  }
}

// Create a new stock
export const createStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product, quantity, warehouse } = req.body

    if (!isValidObjectId(product, res)) return
    if (!warehouse?.name || !warehouse?.location || warehouse.capacity === undefined) {
      res.status(400).json({ message: 'Warehouse name, location, and capacity are required' })
      return
    }

    const stock = new Stock({ product, quantity, warehouse })
    const saved = await stock.save()

    res.status(201).json(saved)
  } catch (error) {
    handleError(res, error)
  }
}

// Get stock by ID
export const getStockById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const stock = await Stock.findById(id).populate('product', 'name').lean()
    if (!stock) {
      res.status(404).json({ message: 'Stock not found' })
      return
    }

    res.status(200).json(stock)
  } catch (error) {
    handleError(res, error)
  }
}

// Update stock
export const updateStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { product, quantity, warehouse } = req.body

    if (!isValidObjectId(id, res)) return
    if (product && !isValidObjectId(product, res)) return

    const updateData: Partial<IStock> = {}
    if (product) updateData.product = product
    if (quantity !== undefined) updateData.quantity = quantity
    if (warehouse) updateData.warehouse = warehouse

    const updated = await Stock.findByIdAndUpdate(id, updateData, { new: true }).lean()
    if (!updated) {
      res.status(404).json({ message: 'Stock not found' })
      return
    }

    res.status(200).json(updated)
  } catch (error) {
    handleError(res, error)
  }
}

// Delete stock
export const deleteStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const deleted = await Stock.findByIdAndDelete(id).lean()
    if (!deleted) {
      res.status(404).json({ message: 'Stock not found' })
      return
    }

    res.status(200).json({ message: 'Stock deleted successfully' })
  } catch (error) {
    handleError(res, error)
  }
}