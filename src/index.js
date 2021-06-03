require('./db/mongoose');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const app = express();
const path = require('path');
//Import Middlewares
const { errorHandler } = require('./middleware/errorHandler');

//Import Errors
const { NotFound } = require('./error/notFound');
//Import Routes
const userRouter = require('./router/userRouter');
const registerRouter = require('./router/registerRouter');
const photoRouter = require('./router/photoRouter');

const albumRouter = require('./router/albumRouter');
const tagRouter = require('./router/tagRouter');
//Configure App
app.use(express.json());
app.use(cors())
app.get('/public/images/:userId/:imageName', async(req,res) => {
    res.sendFile(path.join(__dirname, `../public/images/${req.params.userId}/${req.params.imageName}`))
})
app.use((req,res,next) => {
    
    console.log({body:req.body,path:req.originalUrl})
    next()
})
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/photo', photoRouter);
app.use('/album', albumRouter);
app.use('/tag', tagRouter);

app.use('*', (req, res) => {
    throw new NotFound();
});
//Error Handler
app.use(errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Listening On Port ${process.env.PORT}`);
});
