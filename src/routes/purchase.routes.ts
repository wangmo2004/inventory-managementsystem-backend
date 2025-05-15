import { Router } from 'express'
import {
  createPurchase,
  getPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
} from '../controllers/purchase.controller'

const router = Router()

router.post('/', createPurchase)
router.get('/', getPurchases)
router.get('/:id', getPurchaseById)
router.put('/:id', updatePurchase)
router.delete('/:id', deletePurchase)

export default router
