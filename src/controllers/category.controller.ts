import { handleError } from "../utils/utils"
import { Request, Response } from "express"
import { isValidObjectId } from "../utils/utils"
import Category from "../models/category.model"

// Get all categories
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().lean()
    res.status(200).json(categories)
  } catch (error) {
    handleError(res, error)
  }
}

// Create a new category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body

    const existingCategory = await Category.findOne({ name }).lean()
    if (existingCategory) {
      res.status(409).json({ message: 'Category name already exists' })
      return
    }

    const category = new Category({ name, description })
    const savedCategory = await category.save()

    res.status(201).json(savedCategory)
  } catch (error) {
    handleError(res, error)
  }
}

// Get category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const category = await Category.findById(id).lean()
    if (!category) {
      res.status(404).json({ message: 'Category not found' })
      return
    }

    res.status(200).json(category)
  } catch (error) {
    handleError(res, error)
  }
}

// Update category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { name, description } = req.body

    if (!isValidObjectId(id, res)) return
    if (!name && !description) {
      res.status(400).json({ message: 'No update fields provided' })
      return
    }

    // Check for duplicate name
    if (name) {
      const nameExists = await Category.findOne({
        name,
        _id: { $ne: id }
      }).lean()
      if (nameExists) {
        res.status(400).json({ message: 'Category name already in use' })
        return
      }
    }

    const updateData: Partial<{ name: string; description: string }> = {}
    if (name) updateData.name = name
    if (description) updateData.description = description

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true
    }).lean()

    if (!updatedCategory) {
      res.status(404).json({ message: 'Category not found' })
      return
    }

    res.status(200).json(updatedCategory)
  } catch (error) {
    handleError(res, error)
  }
}

// Delete category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (!isValidObjectId(id, res)) return

    const deletedCategory = await Category.findByIdAndDelete(id).lean()
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' })
      return
    }

    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    handleError(res, error)
  }
}
