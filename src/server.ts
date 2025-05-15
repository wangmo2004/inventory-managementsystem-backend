import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'

// Load envionment varialbles
dotenv.config()

const port = process.env.PORT || 5000

connectDB()

// Star server
app.listen(port,() =>{
    console.log(`Server runnng on port ${port}`)
})









































