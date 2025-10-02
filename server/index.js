const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./config/config')
require('dotenv').config()
const PORT = process.env.PORT || 5000

//paths
const userRoute = require('./Routes/userRoute')

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","DELETE"],
    credentials:true
}))
app.use('/users',userRoute)
app.get('/',(req,res)=>{
    res.send('dasdas')
})

db().then(()=>{
    app.listen(PORT)
})