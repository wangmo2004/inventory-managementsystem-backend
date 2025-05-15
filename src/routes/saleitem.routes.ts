import { Router } from 'express'
import {
  getSaleItems,
  createSaleItem,
  getSaleItemById,
  updateSaleItem,
  deleteSaleItem
} from '../controllers/saleitem.controller'

const router = Router()

router.get('/', getSaleItems)
router.post('/', createSaleItem)
router.get('/:id', getSaleItemById)
router.put('/:id', updateSaleItem)
router.delete('/:id', deleteSaleItem)

export default router