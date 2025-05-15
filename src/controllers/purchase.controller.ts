import { Request, Response } from 'express'
import Purchase from '../models/purchase.model'
import { isValidObjectId, handleError } from '../utils/utils'

// Create a new purchase
export const createPurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { supplier, totalAmount, status, date } = req.body

    if (!supplier ) {
      res.status(400).json({ message: 'Supplier, totalAmount, status, and date are required' })
      return
    }

    if (!isValidObjectId(supplier, res)) return

    const newPurchase = new Purchase({
      supplier,
      totalAmount,
      status,
      date,
    })

    const savedPurchase = await newPurchase.save()
    res.status(201).json(savedPurchase)
  } catch (error) {
    handleError(res, error)
  }
}

// Get all purchases
export const getPurchases = async (_req: Request, res: Response): Promise<void> => {
  try {
    const purchases = await Purchase.find().populate('supplier').lean()
    res.status(200).json(purchases)
  } catch (error) {
    handleError(res, error)
  }
}

// Get a purchase by ID
export const getPurchaseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const purchase = await Purchase.findById(id).populate('supplier').lean()
    if (!purchase) {
      res.status(404).json({ message: 'Purchase not found' })
      return
    }

    res.status(200).json(purchase)
  } catch (error) {
    handleError(res, error)
  }
}

// Update a purchase
export const updatePurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { supplier, totalAmount, status, date } = req.body

    if (!isValidObjectId(id, res)) return

    const updateData: Partial<{
      supplier: string
      totalAmount: number
      status: string
      date: Date
    }> = {}

    if (supplier) {
      if (!isValidObjectId(supplier, res)) return
      updateData.supplier = supplier
    }
    if (totalAmount) updateData.totalAmount = totalAmount
    if (status) updateData.status = status
    if (date) updateData.date = date

    const updatedPurchase = await Purchase.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate('supplier').lean()

    if (!updatedPurchase) {
      res.status(404).json({ message: 'Purchase not found' })
      return
    }

    res.status(200).json(updatedPurchase)
  } catch (error) {
    handleError(res, error)
  }
}

// Delete a purchase
export const deletePurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const deletedPurchase = await Purchase.findByIdAndDelete(id).lean()
    if (!deletedPurchase) {
      res.status(404).json({ message: 'Purchase not found' })
      return
    }

    res.status(200).json({ message: 'Purchase deleted successfully' })
  } catch (error) {
    handleError(res, error)
  }
}
