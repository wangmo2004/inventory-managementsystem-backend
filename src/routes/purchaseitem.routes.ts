import { Router } from 'express'
import {
  getPurchaseItems,
  createPurchaseItem,
  getPurchaseItemById,
  updatePurchaseItem,
  deletePurchaseItem
} from '../controllers/purchaseitem.controller'

const router = Router()

router.get('/', getPurchaseItems)
router.get('/:id', getPurchaseItemById)
router.post('/', createPurchaseItem)
router.put('/:id', updatePurchaseItem)
router.delete('/:id', deletePurchaseItem)

export default router