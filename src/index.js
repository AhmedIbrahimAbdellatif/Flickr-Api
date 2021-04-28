require('./db/mongoose')

const express = require('express')
require('express-async-errors');
const app = express()

//Import Middlewares
const { errorHandler } = require('./middleware/error-handler')

//Import Errors
const { NotFound } = require('./error/not-found')
//Import Routes
const userRouter = require('./router/userRouter')
const registerRouter = require('./router/registerRouter')
const photoRouter = require('./router/photoRouter')

//Configure App
app.use(express.json())

app.use('/register',registerRouter)
app.use('/user',userRouter)
app.use('/photo',photoRouter)
app.use('*', (req,res) => {
    throw new NotFound()
})
//Error Handler
app.use(errorHandler)
app.listen(process.env.PORT,()=>{
    console.log(`Listening On Port ${process.env.PORT}`);
})