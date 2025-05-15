import { Router } from 'express'
import { createUser, getUsers, updateUser } from '../controllers/user.controller'

const router = Router()

// POST /api/users - Create a new user
router.post('/', createUser)

router.get('/', getUsers)

router.patch('/:id', updateUser)

export default router