import { Router } from 'express'
import {
  getStockMovements,
  createStockMovement,
  getStockMovementById,
  updateStockMovement,
  deleteStockMovement
} from '../controllers/stockmovement.controller'

const router = Router()

router.get('/', getStockMovements)
router.post('/', createStockMovement)
router.get('/:id', getStockMovementById)
router.put('/:id', updateStockMovement)
router.delete('/:id', deleteStockMovement)

export default router