const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')

mongoose.connect(config.database, { useNewUrlParser: true , useUnifiedTopology: true })

mongoose.connection.on('connected', ()=>{
    console.log('Connected to database: '+config.database)
})
mongoose.connection.on('error', (err)=>{
    console.log('Database error: '+err)
})

const app = express()

const user  = require('./routes/users')




const port = 3000

// cors middleware
app.use(cors())

//Bodyparser middleware
app.use(bodyparser.json())

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')))



//indev route
app.get('/', (req,res)=>{
    res.send("Invalid Endpoint.")
})

app.use('/users', user)





app.listen(port, ()=> {
    console.log("Listening port: "+port)
    
})