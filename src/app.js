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

//Models
const Tag = require('./model/tagModel');
const Photo = require('./model/photoModel');

//Configure App
app.use(express.json());
app.use(cors())
app.get('/public/images/:userId/:imageName', async(req,res) => {
    res.sendFile(path.join(__dirname, `../public/images/${req.params.userId}/${req.params.imageName}`))
})
app.use((req,res,next) => {
    if(process.env.NODE_ENV != 'TEST')
        console.log({body:req.body,path:req.originalUrl})
    next()
})
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/photo', photoRouter);
app.use('/album', albumRouter);
app.use('/tag', tagRouter);
app.get('/adjustTag',async(req,res) => {

    const tags= await Tag.find({});
    tags.forEach(async(tag) => {
        const photos = await Photo.find({
            tags: tag._id
        });
        console.log(photos.length);
        if(photos.length == 0)
            await Tag.findByIdAndDelete(tag._id);
        else
            await tag.updateOne({count:photos.length});
    });
    res.send({})
})
app.use('*', (req, res) => {
    throw new NotFound();
});
//Error Handler
app.use(errorHandler);

module.exports = {
    app
}