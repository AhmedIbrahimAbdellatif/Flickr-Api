const request = require('supertest');
const { app } = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/model/userModel');
const Album = require('../src/model/albumModel');
const Photo = require('../src/model/photoModel');

const userId = new mongoose.Types.ObjectId();
const albumId = new mongoose.Types.ObjectId();
const photoId = new mongoose.Types.ObjectId();
const data = {
    userData: {
        _id: userId,
        email: 'test@test.com',
        password: 'test@test.pass',
        firstName: 'Test',
        lastName: 'flickr',
        age: 21
    },
    albumData:{
        _id: albumId,
        creator: userId,
        title: 'Test'
    },
    photoData: {
        _id: photoId,
        title: 'Test',
        creator: userId,
        url:'http://localhost:3000/public/images/default/20.jpeg'
    }
}
beforeEach(async() => {
    await User.deleteMany({});
    await Album.deleteMany({});
    await Photo.deleteMany({});
    const users = await User.find({}).countDocuments();
    const user = new User(data.userData);
    await user.save();
    data.token = user.signToken(user._id);
    await new Album(data.albumData).save();  
    await new Photo(data.photoData).save();  
});
 

/**Register Controller */
test('Test Reset Password flow', async() => {

    
    await request(app)
            .post('/register/forgetPassword')
            .send({}).expect(400);
    await request(app)
            .post('/register/forgetPassword')
            .send({
                email: data.userData.email
            }).expect(200);
    
    const user = await User.findById(userId).select('+forgetPassCode');
    await request(app)
            .post('/register/resetPassword')
            .send({
                email: data.userData.email,
                code: user.forgetPassCode,
                newPass: 'fifa2011'
            }).expect(200);
    
    await request(app)
            .post('/register/logIn')
            .send({
                email: data.userData.email,
                password:'fifa2011'
            }).expect(200);
})



/**Album Controller */





/**User Controller Test */
test('Edit Cover Photo',async() =>{

    // No Auth
    await request(app)
            .patch('/user/editCoverPhoto')
            .send({}).expect(401);
    
    //No PhotoId
    await request(app)
            .patch('/user/editCoverPhoto')
            .set('Authorization',`Bearer ${data.token}`)
            .send({}).expect(400);

    await request(app)
            .patch('/user/editCoverPhoto')
            .set('Authorization',`Bearer ${data.token}`)
            .send({
                photoId
            }).expect(200);

    const user = await User.findById(userId);
    const photo = await Photo.findById(photoId);

    expect(user.coverPhotoUrl).toBe(photo.url);
      
})
test('Edit Profile Photo',async() =>{
    // No Auth
    await request(app)
            .patch('/user/editProfilePhoto')
            .send({}).expect(401); 
    //No PhotoId
    await request(app)
            .patch('/user/editProfilePhoto')
            .set('Authorization',`Bearer ${data.token}`)
            .send({}).expect(400);
    
    await request(app)
            .patch('/user/editProfilePhoto')
            .set('Authorization',`Bearer ${data.token}`)
            .send({
                photoId
            }).expect(200);

    const user = await User.findById(userId);
    const photo = await Photo.findById(photoId);

    expect(user.profilePhotoUrl).toBe(photo.url);
      
})
test('Edit User Info',async() =>{
    // No Auth
    await request(app)
            .patch('/user/editInfo')
            .send({}).expect(401); 
    
    await request(app)
            .patch('/user/editInfo')
            .set('Authorization',`Bearer ${data.token}`)
            .send({
                currentHome: 'Cairo'
            }).expect(400);
    await request(app)
            .patch('/user/editInfo')
            .set('Authorization',`Bearer ${data.token}`)
            .send({
                currentCity: 'Cairo'
            }).expect(200);

    const user = await User.findById(userId);
    expect(user.currentCity).toBe('Cairo');
      
})



/** Photo Controller */