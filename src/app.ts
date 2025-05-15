import express ,{Express}from 'express'
import cors from 'cors'
import userRoutes from'./routes/user.routes'
import productRoutes from './routes/product.routes'
import categoryRoutes from "./routes/category.routes"
import supplierRoutes from './routes/supplier.routes'
import purchaseRoutes from './routes/purchase.routes'
import purchaseitemRoutes from './routes/purchaseitem.routes'
import saleRoutes from './routes/sale.routes'
import saleitemRoutes from './routes/saleitem.routes'
import warehouseRoutes from './routes/warehouse.routes'
import stockRoutes from'./routes/stock.routes'
import stockmovmentRoutes from './routes/stockmovement.routes'

// Initialize Express app
const app:Express= express()

// MiddleWare
app.use(cors())
app.use(express.json())

// Routs
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/supplier',supplierRoutes)
app.use('/api/v1/purchase',purchaseRoutes)
app.use('/api/v1/purchaseitem',purchaseitemRoutes)
app.use('/api/v1/sale',saleRoutes)
app.use('/api/v1/saleitem',saleitemRoutes)
app.use('/api/v1/warehouse',warehouseRoutes)
app.use('/api/v1/stock',stockRoutes)
app.use('/api/v1/stockmovement',stockmovmentRoutes)

// // Rout Routs
app.get('/',(req, res)=>{

    res.send(`
        API is running...
        Status:online`)
})
export default app