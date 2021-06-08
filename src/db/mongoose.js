const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
  if(process.env.NODE_ENV != 'TEST')
      console.log('Database Connected')
  }).catch((err)=>{
    if(process.env.NODE_ENV != 'TEST')
      console.log(err.message)
  });
  