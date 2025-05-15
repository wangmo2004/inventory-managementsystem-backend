import { handleError } from "../utils/utils"
import { Request, Response } from "express"
import { isValidObjectId } from "../utils/utils"
import Supplier from "../models/supplier.model"

// Get all suppliers
export const getSuppliers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await Supplier.find().lean()
    res.status(200).json(suppliers)
  } catch (error) {
    handleError(res, error)
  }
}

// Create a new supplier
export const createSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, contactInfo,address } = req.body

    const existingSupplier = await Supplier.findOne({ name }).lean()
    if (existingSupplier) {
      res.status(409).json({ message: 'Supplier name already exists' })
      return
    }

    const supplier = new Supplier({ name, contactInfo, address})
    const savedSupplier = await supplier.save()

    res.status(201).json(savedSupplier)
  } catch (error) {
    handleError(res, error)
  }
}

// Get supplier by ID
export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const supplier = await Supplier.findById(id).lean()
    if (!supplier) {
      res.status(404).json({ message: 'Supplier not found' })
      return
    }

    res.status(200).json(supplier)
  } catch (error) {
    handleError(res, error)
  }
}

// Update supplier
export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { name, contactInfo, address } = req.body

    if (!isValidObjectId(id, res)) return
    if (!name && !contactInfo&& !address) {
      res.status(400).json({ message: 'No update fields provided' })
      return
    }

    // Check for duplicate name
    if (name) {
      const nameExists = await Supplier.findOne({
        name,
        _id: { $ne: id }
      }).lean()
      if (nameExists) {
        res.status(400).json({ message: 'Supplier name already in use' })
        return
      }
    }

    const updateData: Partial<{ name: string; contactInfo: string, address: string}> = {}
    if (name) updateData.name = name
    if (contactInfo) updateData.contactInfo= contactInfo

    const updatedSupplier = await Supplier.findByIdAndUpdate(id, updateData, {
      new: true
    }).lean()

    if (!updatedSupplier) {
      res.status(404).json({ message: 'Supplier not found' })
      return
    }

    res.status(200).json(updatedSupplier)
  } catch (error) {
    handleError(res, error)
  }
}

// Delete supplier
export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const deletedSupplier = await Supplier.findByIdAndDelete(id).lean()
    if (!deletedSupplier) {
      res.status(404).json({ message: 'Supplier not found' })
      return
    }

    res.status(200).json({ message: 'Supplier deleted successfully' })
  } catch (error) {
    handleError(res, error)
  }
}
