import express, { Express } from 'express'
import cors from 'cors'
import productRoutes from './routes/product.routes'
import categoryRoutes from './routes/category.routes'
import purchaseRoutes from './routes/purchase.routes'
import supplierRoutes from './routes/supplier.routes'
import purchaseitemRoutes from './routes/purchaseitem.routes'
import saleRoutes from './routes/sale.routes'
import saleitemRoutes from './routes/saleitem.routes'
import warehouseRoutes from './routes/warehouse.routes'
import stockRoutes from './routes/stock.routes'
import stockMovementRoutes from './routes/stockmovement.routes'
import authRoutes from './routes/auth.routes'
import updateuserRoutes from './routes/auth.routes'
import userRoutes from './routes/auth.routes'
// Initialize Express app
const app: Express = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/purchase', purchaseRoutes)
app.use('/api/v1/supplier', supplierRoutes)
app.use('/api/v1/purchaseitem', purchaseitemRoutes)
app.use('/api/v1/sale', saleRoutes)
app.use('/api/v1/saleitem',  saleitemRoutes)
app.use('/api/v1/warehouse',  warehouseRoutes)
app.use('/api/v1/stock',  stockRoutes)
app.use('/api/v1/stockMovement',  stockMovementRoutes)
app.use('/api/v1/updateuser',updateuserRoutes)
app.use('/api/v1/user',userRoutes)


// Root route
app.get('/', (_req, res) => {
    res.send(`
        API is running...

        Status: Online
    `)
})

export default app