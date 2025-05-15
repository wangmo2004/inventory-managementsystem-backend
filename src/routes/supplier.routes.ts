import { Router } from 'express'
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplier.controller'

const router = Router()

router.post('/', createSupplier)
router.get('/', getSuppliers)
router.get('/:id', getSupplierById)
router.put('/:id', updateSupplier)
router.delete('/:id', deleteSupplier)

export default router
