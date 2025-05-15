import { Request, Response } from 'express'
import { isValidObjectId, handleError } from '../utils/utils'
import StockMovement from '../models/stockmovement'
import { IStockMovement } from '../types/stockmovement'

// Get all stock movements
export const getStockMovements = async (_req: Request, res: Response): Promise<void> => {
  try {
    const movements = await StockMovement.find()
      .populate('product', 'name')
      .populate('source', 'name')
      .populate('destination', 'name')
      .lean()
    res.status(200).json(movements)
  } catch (error) {
    handleError(res, error)
  }
}

// Create a stock movement
export const createStockMovement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product, source, destination, quantity, date } = req.body

    if (!isValidObjectId(product, res)) return
    if (!isValidObjectId(source, res)) return
    if (!isValidObjectId(destination, res)) return

    const movement = new StockMovement({ product, source, destination, quantity, date })
    const saved = await movement.save()

    res.status(201).json(saved)
  } catch (error) {
    handleError(res, error)
  }
}

// Get a single stock movement by ID
export const getStockMovementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const movement = await StockMovement.findById(id)
      .populate('product', 'name')
      .populate('source', 'name')
      .populate('destination', 'name')
      .lean()

    if (!movement) {
      res.status(404).json({ message: 'Stock movement not found' })
      return
    }

    res.status(200).json(movement)
  } catch (error) {
    handleError(res, error)
  }
}

// Update a stock movement
export const updateStockMovement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { product, source, destination, quantity, date } = req.body

    if (!isValidObjectId(id, res)) return
    if (product && !isValidObjectId(product, res)) return
    if (source && !isValidObjectId(source, res)) return
    if (destination && !isValidObjectId(destination, res)) return

    const updateData: Partial<IStockMovement> = {}
    if (product) updateData.product = product
    if (source) updateData.source = source
    if (destination) updateData.destination = destination
    if (quantity !== undefined) updateData.quantity = quantity
    if (date) updateData.date = date

    const updated = await StockMovement.findByIdAndUpdate(id, updateData, { new: true }).lean()

    if (!updated) {
      res.status(404).json({ message: 'Stock movement not found' })
      return
    }

    res.status(200).json(updated)
  } catch (error) {
    handleError(res, error)
  }
}

// Delete a stock movement
export const deleteStockMovement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const deleted = await StockMovement.findByIdAndDelete(id).lean()
    if (!deleted) {
      res.status(404).json({ message: 'Stock movement not found' })
      return
    }

    res.status(200).json({ message: 'Stock movement deleted successfully' })
  } catch (error) {
    handleError(res, error)
  }
}