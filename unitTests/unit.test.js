const request = require('supertest');
const { app } = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/model/userModel');
const Album = require('../src/model/albumModel');
const Photo = require('../src/model/photoModel');
const Comment = require('../src/model/commentModel');
const Tag = require('../src/model/tagModel');
const { redisClient } = require('../src/third-Parties/redis');

const userId = new mongoose.Types.ObjectId();
const userLogId = new mongoose.Types.ObjectId();
const userChangePassId = new mongoose.Types.ObjectId();
const userFaveouriedId = new mongoose.Types.ObjectId();
const albumId = new mongoose.Types.ObjectId();
const albumDeleteId = new mongoose.Types.ObjectId();
const albumDeletePhotoId = new mongoose.Types.ObjectId();
const photoId = new mongoose.Types.ObjectId();
const photoDeleteId = new mongoose.Types.ObjectId();
const tag1Id = new mongoose.Types.ObjectId();
const tag2Id = new mongoose.Types.ObjectId();
const commentId = new mongoose.Types.ObjectId();

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
    userLogData: {
        _id: userLogId,
        email: 'test2@test.com',
        password: 'test2@test.pass',
        firstName: 'Test',
        lastName: 'flickr',
        age: 21,
    },
    userChangePassData: {
        _id: userChangePassId,
        email: 'test3@test.com',
        password: 'test2@test.pass',
        firstName: 'Test',
        lastName: 'flickr',
        age: 21,
    },
    userFavouriedData: {
        _id: userFaveouriedId,
        email: 'test4@test.com',
        password: 'test4@test.pass',
        firstName: 'Test',
        lastName: 'flickr',
        favourites: [photoId],
        age: 21,
    },
    albumData: {
        _id: albumId,
        creator: userId,
        title: 'Test',
    },
    albumDeleteData: {
        _id: albumDeleteId,
        creator: userId,
        title: 'Test',
    },
    albumDeletePhotoData: {
        _id: albumDeletePhotoId,
        creator: userId,
        title: 'Test',
    },
    photoData: {
        _id: photoId,
        title: 'Test',
        creator: userId,
        albums: [albumDeletePhotoId],
        url: 'http://localhost:3000/public/images/default/20.jpeg'
    },
    photoDeleteData: {
        _id: photoDeleteId,
        title: 'Test',
        creator: userId,
        albums: [albumDeletePhotoId],
        url: 'http://localhost:3000/public/images/default/21.jpeg'
    },
    tag1Data: {
        _id: tag1Id,
        name: 'beautifulSnow',
    },
    tag2Data: {
        _id: tag2Id,
        name: 'snow',
    },    
    commentData: {
        _id: commentId,
        user: userId,
        text: 'Testing',
        photo: photoId,
    },
    tagData: {
        name: 'test',
    },
}

beforeAll(async () => {
    await User.deleteMany({});
    await Album.deleteMany({});
    await Photo.deleteMany({});
    await Comment.deleteMany({});
    await Tag.deleteMany({});
    const user = new User(data.userData);
    await user.save();
    const userLog = new User(data.userLogData);
    await userLog.save();
    const userFavouried = new User(data.userFavouriedData);
    await userFavouried.save();
    const userChangePass = new User(data.userChangePassData);
    await userChangePass.save();
    data.token = user.signToken(user._id);
    data.logOutToken = userLog.signToken(userLog._id);
    data.favouriedToken = userFavouried.signToken(userFavouried._id);
    await new Album(data.albumData).save();
    await new Album(data.albumDeleteData).save();
    await new Album(data.albumDeletePhotoData).save();
    await new Photo(data.photoData).save();
    await new Photo(data.photoDeleteData).save();
    await new Tag(data.tag1Data).save();
    await new Tag(data.tag2Data).save();
    await new Comment(data.commentData).save();
    await new Tag(data.tagData).save();
});

afterAll(async ()=> {
    await mongoose.disconnect();
    await redisClient.quit();

})
/**Register Controller */
test('Test Reset Password flow', async () => {
    await request(app)
        .post('/register/forgetPassword')
        .send({}).expect(400);
    await request(app)
        .post('/register/forgetPassword')
        .send({
            email: data.userChangePassData.email
        }).expect(200);

    const user = await User.findById(userChangePassId).select('+forgetPassCode');
    await request(app)
        .post('/register/resetPassword')
        .send({
            email: data.userChangePassData.email,
            code: user.forgetPassCode,
            newPass: 'fifa2011'
        }).expect(200);

    await request(app)
        .post('/register/logIn')
        .send({
            email: data.userChangePassData.email,
            password: 'fifa2011'
        }).expect(200);
})

test('Test SignUp', async () => {
    await request(app).post('/register/signUp').send({}).expect(400);
    await request(app)
        .post('/register/signUp')
        .send({
            email: data.userData.email,
            password: data.userData.password,
            firstName: data.userData.firstName,
            lastName: data.userData.firstName,
            age: data.userData.age,
        })
        .expect(403);
    await request(app)
        .post('/register/signUp')
        .send({
            email: 'unitTest@test.com',
            password: data.userData.password,
            firstName: data.userData.firstName,
            lastName: data.userData.firstName,
            age: data.userData.age,
        })
        .expect(201);
});

test('Test LogIn', async () => {
    await request(app).post('/register/logIn').send({}).expect(400);
    await request(app)
        .post('/register/logIn')
        .send({
            email: data.userLogData.email,
            password: 'wrongPass',
        })
        .expect(401);
    await request(app)
        .post('/register/logIn')
        .send({
            email: 'wrongUser@test.com',
            password: data.userLogData.password,
        })
        .expect(401);
    await request(app)
        .post('/register/logIn')
        .send({
            email: data.userLogData.email,
            password: data.userLogData.password,
        })
        .expect(200);
});

test('Test LogOut Flow', async () => {
    const response = await request(app)
        .post('/register/logIn')
        .send({
            email: data.userLogData.email,
            password: data.userLogData.password,
        })
        .expect(200);
    await request(app)
        .patch('/user/editInfo')
        .set('Authorization', `Bearer ${data.logOutToken}`)
        .send({
            currentCity: 'Cairo',
        })
        .expect(200);
    await request(app)
        .post('/register/logOut')
        .set('Authorization', `Bearer ${data.logOutToken}`)
        .expect(200);
    await request(app)
        .patch('/user/editInfo')
        .set('Authorization', `Bearer ${data.logOutToken}`)
        .send({
            currentCity: 'Cairo',
        })
        .expect(401);
});

/**Album Controller */
test('Create Album', async () => {
    await request(app)
        .post('/album/createAlbum')
        .send({ 'title': "testAlbum" })
        .expect(401);
    const response = await request(app)
        .post('/album/createAlbum')
        .set('Authorization', `Bearer ${data.token}`)
        .send({ 'title': "testAlbum" })
        .expect(201);
    expect(response.body.album.creator).toBe(userId.toString());
})

test('Delete Album', async () => {
    await request(app)
        .delete(`/album/deleteAlbum/${albumDeleteId}`)
        .expect(401);
    await request(app)
        .delete(`/album/deleteAlbum/${albumDeleteId}`)
        .set('Authorization', `Bearer ${data.token}`)
        .expect(200);
})

test('Add Photo to Album', async () => {
    const response = await request(app)
        .post('/photo/upload')
        .set('Authorization', `Bearer ${data.token}`)
        .attach('file', 'unitTests/fixtures/philly.jpg')
        .field('contentType', 'Photo')
        .field('title', 'test1')
        .expect(201);
    await request(app)
        .post(`/album/addPhoto`)
        .send({ 'albumId': albumId, 'photoId': response.body._id })
        .expect(401);
    await request(app)
        .post(`/album/addPhoto`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({ 'albumId': albumId, 'photoId': response.body._id })
        .expect(200);
    const album = await Album.findById(albumId);
    expect(album.photoIds.toString()).toContain(response.body._id);
})

test('Delete Photo from Album', async () => {
    await request(app)
        .delete(`/album/deletePhoto`)
        .send({ 'albumId': albumId, 'photoId': photoId })
        .expect(401);
    await request(app)
        .delete(`/album/deletePhoto`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({ 'albumId': albumId, 'photoId': photoId })
        .expect(200);
    const album = await Album.findById(albumId);
    expect(album.photoIds.toString()).not.toContain(photoId.toString());
})

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

});
test('Edit User Info', async () => {
    // No Auth
    await request(app).patch('/user/editInfo').send({}).expect(401);

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

test('View User Favourites', async () => {
    const response = await request(app)
                        .get(`/user/fav/${userId}`)
                        .expect(200);
    expect(response.body.favorites).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ _id: photoId.toString() })
        ])
    );
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
        .delete(`/photo/delete/${photoDeleteId}`)
        .send({}).expect(401);
    await request(app)
        .delete(`/photo/delete/${photoDeleteId}`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({}).expect(200);
    const album = await Album.findById(albumDeletePhotoId);
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
        .send({ 'photoId': photoId })
        .expect(401);
    await request(app)
        .delete('/photo/deleteFromFavorites')
        .set('Authorization', `Bearer ${data.favouriedToken}`)
        .send({ 'photoId': photoId })
        .expect(200);
    const user = await User.findById(userFaveouriedId);
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

/* Tag Controller*/
test('Search Tags', async () =>{
    const response1 = await request(app)
        .get('/tag/search/snow')
        .expect(200);
    expect(response1.body.searchResult).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ _id: tag1Id.toString() })
        ])
    );
    expect(response1.body.searchResult).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ _id: tag2Id.toString() })
        ])
    );
    const response2 = await request(app)
        .get('/tag/search/beautiful')
        .expect(200);
    expect(response2.body.searchResult).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ _id: tag1Id.toString() })
        ])
    );
    expect(response2.body.searchResult).not.toEqual(
        expect.arrayContaining([
            expect.objectContaining({ _id: tag2Id.toString() })
        ])
    );
    const response3 = await request(app)
        .get('/tag/search/summer')
        .expect(200);
    expect(response3.body.searchResult).not.toEqual(
        expect.arrayContaining([
            expect.objectContaining({ _id: tag1Id.toString() })
        ])
    );
    expect(response3.body.searchResult).not.toEqual(
        expect.arrayContaining([
            expect.objectContaining({ _id: tag2Id.toString() })
        ])
    );
})


test('Edit ShowCase And Description', async () => {
    await request(app)
        .patch(`/user/${data.userData._id}`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({})
        .expect(400);
    await request(app)
        .patch(`/user/${data.userData._id}`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            description: 'Photos are my passion',
            showCase: {
                title: 'a glimpse of my life',
                photos: [data.photoData._id],
            },
        })
        .expect(200);
    const user = await User.findById(userId);
    expect(user.description).toBe('Photos are my passion');
    expect(user.showCase.title).toBe('a glimpse of my life');
    expect(user.showCase.photos).toContainEqual(data.photoData._id);

    await request(app)
        .patch(`/user/${data.photoData._id}`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            description: 'Photos are my passion',
            showCase: {
                title: 'a glimpse of my life',
                photos: [data.photoData._id],
            },
        })
        .expect(404);
});
test('Test Search User', async () => {
    await request(app).get('/user/search/es').expect(200);
});

/** Photo Controller */
test('Add Tag To Photo', async () => {
    await request(app)
        .patch(`/photo/addTags/${data.userData._id}`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({ tag: 'testTag' })
        .expect(404);
    await request(app)
        .patch(`'photo/addTags/${data.photoData._id}`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({})
        .expect(400);
    await request(app)
        .patch(`/photo/addTags/${data.photoData._id}`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({ tag: 'testTag' })
        .expect(200);
    await request(app)
        .patch(`/photo/addTags/${data.photoData._id}`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({ tag: 'testTag' })
        .expect(409);
});
test('Comment On Media', async () => {
    await request(app)
        .post(`/photo/${data.photoData._id}/comment`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            comment: 'This is very cool!',
        })
        .expect(200);
    await request(app)
        .post(`/photo/${data.userData._id}/comment`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            comment: 'This is very cool!',
        })
        .expect(404);
    await request(app)
        .post(`/photo/${data.photoData._id}/comment`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({})
        .expect(400);
});
test('Getting Photo Comments', async () => {
    await request(app)
        .post('/photo/getComments')
        .send({
            photoId: data.photoData._id,
        })
        .expect(200);
    await request(app)
        .post('/photo/getComments')
        .send({
            photoId: data.userData._id,
        })
        .expect(404);
    await request(app).post('/photo/getComments').send({}).expect(400);
});
test('Deleting A Comment', async () => {
    await request(app)
        .delete(`/photo/${data.photoData._id}/comment`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({})
        .expect(400);
    await request(app)
        .delete(`/photo/${data.userData._id}/comment`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            commentId: data.commentData._id,
        })
        .expect(404);
    await request(app)
        .delete(`/photo/${data.photoData._id}/comment`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            commentId: data.commentData._id,
        })
        .expect(200);
    await request(app)
        .delete(`/photo/${data.userData._id}/comment`)
        .set('Authorization', `Bearer ${data.token}`)
        .send({
            commentId: data.commentData._id,
        })
        .expect(404);
});

/** Tag Controller */
test('Getting Tag Media', async () => {
    await request(app).get(`/tag/${data.tagData.name}`).expect(200);
    await request(app).get(`/tag/wrongName`).expect(404);
});
test('Getting Trending Tags', async () => {
    await request(app).get(`/tag/trending`).expect(200);
});
