const mongoose = require('mongoose')
const User = require('../model/userModel')
mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(async() => {
  console.log('Database Connected');
  if(process.env.NODE_ENV === 'testTeam')
    {
      console.log('NOT Here');
      await User.deleteMany({});
      await new User({
        email: 'test@test.com',
        password: 'test123456789',
        firstName: 'Test',
        lastName: 'flickr',
        age: 21,
      }).save();
    }
  }).catch((err)=>{
    if(process.env.NODE_ENV != 'TEST')
      console.log(err.message)
  });
  