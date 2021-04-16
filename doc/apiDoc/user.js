/**
 * User Endpoints
 */
/**
 * @apiDefine Authentication
 * @apiHeader {String} Authorization Users access-token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer asdasdkasdliuaslidas"
 *     }
 */
/**
 * @apiDefine  photoObjects
 * @apiSuccess {Object} photo
 * @apiSuccess {String} photo._id Image Id
 * @apiSuccess {String} photo.url Image Url
 * @apiSuccess {String} photo.title Image title
 * @apiSuccess {String} photo.description Image description
 * @apiSuccess {String[]} photo.tags Image tags
 * @apiSuccess {Number} photo.views Image number of views
 * @apiSuccess {Number} photo.favouritesNum Image number of favourites
 * @apiSuccess {Number} photo.commentsNum Image number of comments
 * @apiSuccess {Object} photo.creator Image user Creator
 * @apiSuccess {String} photo.creator.firstName  User Creator firstName
 * @apiSuccess {String} photo.creator.lastName  User Creator lastName
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "_id": "5349b4ddd2781d08c09890f4",
 *       "title": "Cat",
 *       "description": "image description",
 *       "tags": ["cat","animals"],
 *       "views": 1023,
 *       "favouritesNum": 1023,
 *       "commentsNum": 1023,
 *       "creator": {
 *          "firstName": "Abdelrahman",
 *          "lastName": "Shahda"
 *        },
 *     }]
 */
 /**
  * @apiUse photoObjects
  * @api {get} /user/photostream/:userId User Photostream
  * @apiName Get User Photostream
  * @apiGroup User
  * @apiVersion 1.0.0
  * @apiDescription Return a certain User photostream 
  * @apiParamExample {json} Request-Example:
  * {
  *     userId: "5349b4ddd2781d08c09890f4"
  * }
  * @apiError (404) UserNotFound  The id of the user wasn't found
   * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "User Not Found"
 *        }
 *     }
  */
 /**
  * @apiUse Authentication
  * @api {post} /user/sendMessage Message User
  * @apiName Message User
  * @apiGroup User
  * @apiVersion 1.0.0
  * @apiDescription Message Another User 
  * @apiParam {String} userId User to send message to
  * @apiParam {String} title Message Title
  * @apiParam {String} text Message text
  * @apiParamExample {json} Request-Example:
  *     {
  *       "userId": "asdasdasd2323423",
  *       "text": "Hi there!",
  *       "title": "Message"
  *     }
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  *     {}
  * @apiError (404) UserNotFound  The id of the user wasn't found
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "error": {
  *          "message": "User Not Found"
  *        }
  *     }
  */
 /**
  * @apiUse Authentication
  * @api {get} /user/messages/me Get My Messages
  * @apiName Get My Messages
  * @apiGroup User
  * @apiVersion 1.0.0
  * @apiDescription Get My Messages
  * @apiSuccess {Object} messages
  * @apiSuccess {String} messages._id Message Id
  * @apiSuccess {String} messages.title Message title
  * @apiSuccess {String} messsages.text  Message text
  * @apiSuccess {Object} messages.sender Message Sender
  * @apiSuccess {String} messages.sender.firstName  Message Sender firstName
  * @apiSuccess {String} messages.sender.lastName  Message Sender lastName
  * @apiSuccess {Object} messages.receiver Message Receiver
  * @apiSuccess {String} messages.receiver.firstName  Message Receiver firstName
  * @apiSuccess {String} messages.receiver.lastName  Message Receiver lastName
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  *   [{
  *       "_id": "5349b4ddd2781d08c09890f4",
  *       "title": "Cat",
  *       "text": "Hi Man",
  *       "sender": {
  *          "firstName": "Abdelrahman",
  *          "lastName": "Shahda"
  *        },
  *       "receiver": {
  *          "firstName": "Abdelrahman",
  *          "lastName": "Shahda"
  *        },
  *     }]
  * @apiError (404) UserNotFound  The id of the user wasn't found
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "error": {
  *          "message": "User Not Found"
  *        }
  *     }
  */
/**
 * @api {post} /user/login Login a User
 * @apiName Login User
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Login into a user account
 * @apiParam {String} username Username credential
 * @apiParam {String} password Password credential
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "AhmedIbrahim",
 *       "password": "123"
 *     }
 * @apiSuccess {String} Token Returning the access-token to the user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Token": "asdasdkasdliuaslidas"
 *     }
 * @apiError (401) Unauthorized  Wrong user credentials
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": {
 *          "message": "Invalid Credentials"
 *        }
 *     }
*/
/**
 * @apiUse Authentication
 * @api {post} /user/follow Follow a User
 * @apiName Follow User
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Follow a user
 * @apiParam {String} userId User to follow
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userId": "asdasdasd2323423",
 *     }
 * @apiError (404) UserNotFound  The id of the user wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "User Not Found"
 *        }
 *     }
 */
/**
 * @api {get} /user/about/:id Get About
 * @apiName Get User About
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription View user's about
 * @apiParam {String} id User to show about for
 * @apiSuccess {String} userAbout
 * @apiErrorExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userAbout": "Photographer under training"
 *     }
 * @apiError (404) UserNotFound  The id of the user wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "User Not Found"
 *        }
 *     }
 */
/**
 * @api {get} /user/fav/:id Get Favorites
 * @apiName Get User Favorites
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription View user's favorites
 * @apiParam {String} id User to show favorites for
 * @apiSuccess {Object[]} favorites An array of objects containing the photos with its data
 * @apiErrorExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "favorites": [
 *          {
                "_id": "5349b4ddd2781d08c09890f4",
                "tags": ["Tower","Egypt"],
                "views": 1023,
                "favouritesNum": 1023,
                "commentsNum": 1023,
                "creator": {
                    "firstName": "Ahmed",
                    "lastName": "Ibrahim"
                },
                "photo": <binary data>,
                "title": 'Cairo Tower',
                "description": 'Cairo tower at the sunset'
 *          },
 *       ]
 *     }
 * @apiError (404) UserNotFound  The id of the user wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "User Not Found"
 *        }
 *     }
 */
/**
 * @api {get} /user/groups/:id Get Groups
 * @apiName Get User Groups
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription View user's groups
 * @apiParam {String} id User to show groups for
 * @apiSuccess {Object[]} groups An array of objects containing the groups with its data
 * @apiErrorExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "groups": [
 *          {
 *              "_id": "5349b4ddd2781d08c09890f4",
                "admins": ["4349b4ddd2781d08c0989da9","3249b4ddd2781d08c0989f21"],
                "creator": "2149b4ddd2781d08c09890a1",
                "moderators": ["9349b4ddd2781d08c0989555","6249b4ddd2781d08c0989222"],
                "members": ["8349b4ddd2781d08c0989111","8249b4ddd2781d08c0989000"],
                "description": 'Paris'
 *          },
 *       ]
 *     }
 * @apiError (404) UserNotFound  The id of the user wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "User Not Found"
 *        }
 *     }
 */
/**
 * @api {get} /user/albums/:id Get Albums
 * @apiName Get User albums
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription View user's albums
 * @apiParam {String} id User to show albums for
 * @apiSuccess {Object[]} albums An array of objects containing the groups with its data
 * @apiErrorExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "albums": [
 *          {
 *              "_id": "5349b4ddd2781d08c09890f4",
                "title": "Paris pics",
                "description": "Paris pics 2019"
                "creator": "2149b4ddd2781d08c09890a1",
                "views": 1023,
                "images": ["8349b4ddd2781d08c0989111","8249b4ddd2781d08c0989000"],
 *          },
 *       ]
 *     }
 * @apiError (404) UserNotFound  The id of the user wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "User Not Found"
 *        }
 *     }
 */