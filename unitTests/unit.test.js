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
        favourites: [photoId],
        age: 21
    },
    albumData: {
        _id: albumId,
        creator: userId,
        photoIds: [photoId],
        title: 'Test'
    },
    photoData: {
        _id: photoId,
        title: 'Test',
        creator: userId,
        albums: [albumId],
        url: 'http://localhost:3000/public/images/default/20.jpeg'
    }
}
beforeEach(async () => {
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
test('Test Reset Password flow', async () => {


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
            password: 'fifa2011'
        }).expect(200);
})



/**Album Controller */





/**User Controller Test */
test('Edit Cover Photo', async () => {

    // No Auth
    await request(app)
        .patch('/user/editCoverPhoto')
        .send({}).expect(401);

    //No PhotoId
    await request(app)
        .patch('/user/editCoverPhoto')
        .set('Authorization', `Bearer ${data.token}`)
        .send({}).expect(400);

    await request(app)
        .patch('/user/editCoverPhoto')
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            photoId
        }).expect(200);

    const user = await User.findById(userId);
    const photo = await Photo.findById(photoId);

    expect(user.coverPhotoUrl).toBe(photo.url);

})
test('Edit Profile Photo', async () => {
    // No Auth
    await request(app)
        .patch('/user/editProfilePhoto')
        .send({}).expect(401);
    //No PhotoId
    await request(app)
        .patch('/user/editProfilePhoto')
        .set('Authorization', `Bearer ${data.token}`)
        .send({}).expect(400);

    await request(app)
        .patch('/user/editProfilePhoto')
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            photoId
        }).expect(200);

    const user = await User.findById(userId);
    const photo = await Photo.findById(photoId);

    expect(user.profilePhotoUrl).toBe(photo.url);

})
test('Edit User Info', async () => {
    // No Auth
    await request(app)
        .patch('/user/editInfo')
        .send({}).expect(401);

    await request(app)
        .patch('/user/editInfo')
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            currentHome: 'Cairo'
        }).expect(400);
    await request(app)
        .patch('/user/editInfo')
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            currentCity: 'Cairo'
        }).expect(200);

    const user = await User.findById(userId);
    expect(user.currentCity).toBe('Cairo');

})



/** Photo Controller */
test('Upload Photo', async () => {
    // No Auth
    await request(app)
        .post('/photo/upload')
        .set('Authorization', `Bearer ${data.token}`)
        .send({}).expect(400);

    await request(app)
        .post('/photo/upload')
        .set('Authorization', `Bearer ${data.token}`)
        .attach('file', 'unitTests/fixtures/sample-pdf-file.pdf')
        .field('contentType', 'Photo')
        .field('title', 'test1')
        .expect(400);
        
    await request(app)
        .post('/photo/upload')
        .set('Authorization', `Bearer ${data.token}`)
        .attach('file', 'unitTests/fixtures/philly.jpg')
        .field('contentType', 'Photo')
        .field('title', 'test1')
        .expect(201);

    const response = await request(app)
        .post('/photo/upload')
        .set('Authorization', `Bearer ${data.token}`)
        .attach('file', 'unitTests/fixtures/philly.jpg')
        .field('contentType', 'Photo')
        .field('title', 'test1')
        .expect(201);
    expect(response.body.url).not.toBeNull();
    expect(response.body._id).not.toBeNull();

    const response2 = await request(app)
        .post('/photo/upload')
        .set('Authorization', `Bearer ${data.token}`)
        .attach('file', 'unitTests/fixtures/philly.jpg')
        .field('contentType', 'Photo')
        .field('title', 'test1')
        .field('tags', 'tag1,tag2,tag3 ,  tag4')
        .expect(201);
    expect(response2.body.url).not.toBeNull();
    expect(response2.body._id).not.toBeNull();
    expect(response2.body.tagIds.length).toBe(4);
})

test('Delete Photo', async () => {
    // No Auth
    await request(app)
        .delete(`/photo/delete/${photoId}`)
        .send({}).expect(401);
    await request(app)
        .delete(`/photo/delete/${photoId}`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({}).expect(200);
    const album = await Album.findById(albumId);
    expect(album.photoIds.length).toBe(0);
})

test('Add to favourites', async () => {
    const response = await request(app)
        .post('/photo/upload')
        .set('Authorization', `Bearer ${data.token}`)
        .attach('file', 'unitTests/fixtures/philly.jpg')
        .field('contentType', 'Photo')
        .field('title', 'test1')
        .expect(201);
    await request(app)
        .post('/photo/addToFavorites')
        .send({ 'photoId': response.body._id })
        .expect(401);
    await request(app)
        .post('/photo/addToFavorites')
        .set('Authorization', `Bearer ${data.token}`)
        .send({ 'photoId': response.body._id })
        .expect(200);
    const user = await User.findById(userId);
    expect(user.favourites.toString()).toContain(response.body._id);
})

test('Delete from favourites', async () => {
    await request(app)
        .delete('/photo/deleteFromFavorites')
        .send({'photoId': photoId})
        .expect(401);
    await request(app)
        .delete('/photo/deleteFromFavorites')
        .set('Authorization', `Bearer ${data.token}`)
        .send({'photoId': photoId})
        .expect(200);
    const user = await User.findById(userId);
    expect(user.favourites.toString()).not.toContain(photoId.toString());
})

test('who favourited', async () => {
    const response = await request(app)
        .get(`/photo/whoFavorited/${photoId}`)
        .expect(200);
    expect(response.body.user).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ id: userId.toString() })
        ])
    );
})
