/**
 * User Endpoints
 */

////////////////////////////GHALLAB///////////////////////////

/**
 *
 * @api {get} /user/followers/:userId  Get the followers of a certain User
 * @apiName Get User Followers
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiParam  {String} userId   ID of User which is required to show his followers
 * @apiParamExample  {json} Request-Example:
 * {
 *     userId : "5349b4ddd2781d08c09890f4"
 * }
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Success
 * {
 *     followers : [
 *                  {
 *                    _id : String
 *                    firstName : String
 *                    lastName : String
 *                  },
 *                  {
 *                    _id : String
 *                    firstName : String
 *                    lastName : String
 *                  },
 *                 ]
 * }
 * @apiError (404) UserNotFound This user is not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "User Not Found"
 *     }
 * @apiError (400) UserIdMissing This user is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "UserId is required"
 *     }
 *
 */

/**
 *
 * @api {get} /user/followings/:userId  Get the followings of a certain User
 * @apiName Get User Followings
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} userId   ID of User which is required to show his followings
 *
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     userId : "5349b4ddd2781d08c09890f4"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Success
 * {
 *     following : [
 *                  {
 *                    _id : String
 *                    firstName : String
 *                    lastName : String
 *                  },
 *                  {
 *                    _id : String
 *                    firstName : String
 *                    lastName : String
 *                  },
 *                 ]
 * }
 *
 * @apiError (404) This user is not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "User Not Found"
 *     }
 * @apiError (400) UserIdMissing This user is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "UserId is required"
 *     }
 */

/**
 *
 * @api {get} /user/search/:username     Search on user
 * @apiName Search on user username is the keyword you want to search fo
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} username    any word to be matched with user names in the DB
 *
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     username : "Ghallab"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Success
 * {
 *     users : [{
 *                _id : String,
 *                firstName : String,
 *                lastName : String
 *              },
 *              {
 *                _id : String,
 *                firstName : String,
 *                lastName : String
 *              },
 *             ]
 * }
 */

/**
 * @apiUse Authentication
 * @api {patch} /users/:userId   Edit Showcase and Description
 * @apiName Edit Showcase and Description
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} description    The user's Description
 * @apiparam  {String} showcaseTitle       The user's Showcase title
 * @apiParam  {Object[]} photos Array of Photo IDs     This is Optional
 * @apiParamExample  {json} Request-Example:
 * {
 *   {
 *       "description" : "Photos are my passion",
 *       "showCase" : {
 *           "title": "a glimpse of my life",
 *           "photos" : [
 *               "60b5969764664624dc230989",
 *               "60a37996c202e800154d1041"
 *           ]
 *       }
 *   }
 * }
 * @apiParamExample  {json} Request-Example:
 * {
 *      {
 *          "description" : "Photos are my passion",
 *          "showCase" : {
 *                "title": "a glimpse of my life",
 *          }
 *      }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *      {
 *          "description": "Photos are my passion",
 *          "showCase": {
 *              "title":"a glimpse of my life",
 *              "photos": [
 *              {
 *                  "description": "",
 *                  "tags": [
 *                      "60b596e63e57db3fe858f46c",
 *                      "60b596ec3e57db3fe858f46d",
 *                      "60b596f03e57db3fe858f46e"
 *                  ],
 *              "comments": [],
 *              "views": 0,
 *              "favouriteCount": 0,
 *              "isPublic": true,
 *              "license": "None",
 *              "safety": "Safe",
 *              "allowCommenting": true,
 *              "_id": "60b5969764664624dc230989",
 *              "albums": [],
 *              "contentType": "Photo",
 *              "title": "test100",
 *              "url": "http://localhost:3000/public/images/60b48a649f4f7a3e5c45aee4/60b5969764664624dc230988.png",
 *              "creator": "60b48a649f4f7a3e5c45aee4",
 *              "createdAt": "2021-06-01T02:08:23.334Z",
 *              "updatedAt": "2021-06-01T02:18:29.827Z",
 *              "__v": 0,
 *              "commentsNum": 0
 *              }
 *              ]
 *          }
 *      }
 *  }
 * @apiError (400) DescriptionMissing Write Description
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message" : "Description is required"
 *     }
 * @apiError (400) ShowCaseTitleMissing Write Show Case Title
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message" : "showCaseTitle is required"
 *     }
 * @apiError (400) PhotosArrayMissing Photos' IDs must be in the form of An Array
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message" : "Photos IDs Missing"
 *     }
 *
 * @apiError (404) This user is not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "User Not Found"
 *     }
 */
///////////////////////////////////////////SHAHDA////////////////////////////

/**
 * @apiDefine  photoObjects
 * @apiSuccess {Object[]} photos
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "photos": [{
 *       "_id": "5349b4ddd2781d08c09890f4",
 *       "title": "Cat",
 *       "description": "image description",
 *       "tags": ["cat","animals"],
 *       "photoUrl": 'https://www.google.com/photo'
 *       "views": 1023,
 *       "favouriteCount": 1023,
 *       "commentsNum": 1023,
 *       "creator": {
 *          "firstName": "Abdelrahman",
 *          "lastName": "Shahda"
 *        },
 *     }]
 * }
 
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
 *       "message": "User Not Found"
 *     }
 * @apiError (400) UserIdMissing This user is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "UserId is required"
 *     }
 */
/**
 * @api {patch} /user/editCoverPhoto Edit User CoverPhtot
 * @apiUse Authentication
 * @apiName Edit User CoverPhtot
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Edit User CoverPhtot
 * @apiParamExample {json} Request-Example:
 * {
 *     photoId: "5349b4ddd2781d08c09890f4"
 * }
 * @apiError (404) PhotoNotFound  The id of the photo wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Photo Not Found"
 *     }
 * @apiError (400) PhotoIdMissing This Photo is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "PhtotId is required"
 *     }
 * @apiError (400) PhotoInvalid This Photo is invalid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "You can't use this photo as coverPhoto0"
 *     }
 */
/**
 * @api {patch} /user/editInfo Edit User Info
 * @apiUse Authentication
 * @apiName Edit User Info
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Edit User Info
 * @apiParam {String} occupation User's Occupation
 * @apiParam {String} homeTown User's Home Town
 * @apiParam {String} currentCity User's Current City
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "occupation": "Engineer",
 *      "homeTown": "",
 *      "currentCity": ""
 *
 * }
 * @apiError (400) OccupationInvalid  Occupation should be String
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *       "message": "Occupation should be String"
 *
 *     }
 * @apiError (400) CurrentCityInvalid  Current City should be String
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *       "message": "Current City should be String"
 *
 *     }
 * @apiError (400) HomeTownInvalid  Home Town should be String
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *       "message": "Home Town should be String"
 *
 *     }
 * @apiError (400) InvalidEdit  Invalid Edit
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *       "message": "Invalid Edit"
 *
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
 *
 *       "message": "User Not Found"
 *
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
 *
 *        "message": "User Not Found"
 *
 *     }
 */
/////////////////////////////////////////HIMA/////////////////////////////////

/**
 * @api {get} /user/fav/:userId Get Favorites
 * @apiName Get User Favorites
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription View user's favorites
 * @apiParam {String} userId User to show favorites for
 * @apiSuccess {Object[]} favorites An array of objects containing the photos with its data
 * @apiErrorExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "favorites": [
 *          {
 *               "_id": "5349b4ddd2781d08c09890f4",
 *               "tags": ["Tower","Egypt"],
 *               "views": 1023,
 *               "favouriteCount": 0,
 *               "commentsNum": 1023,
 *               "creator": {
 *                   "_id": "60928e30456b633130df176d",
 *                   "firstName": "Ahmed",
 *                   "lastName": "Ibrahim"
 *               },
 *               "url": '',
 *               "title": 'Cairo Tower',
 *               "description": 'Cairo tower at the sunset'
 *          },
 *       ]
 *     }
 * @apiError (404) UserNotFound  The id of the user wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *        "message": "User Not Found"
 *
 *     }
 * @apiError (400) UserIdMissing This user is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "UserId is required"
 *     }
 */

/**
 * @api {get} /user/groups/:userId Get Groups
 * @apiName Get User Groups
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription View user's groups
 * @apiParam {String} userId User to show groups for
 * @apiSuccess {Object[]} groups An array of objects containing the groups with its data
 * @apiErrorExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "groups": [
 *          {
 *              "_id": "5349b4ddd2781d08c09890f4",
 *               "admins": ["4349b4ddd2781d08c0989da9","3249b4ddd2781d08c0989f21"],
 *               "creator": "2149b4ddd2781d08c09890a1",
 *               "moderators": ["9349b4ddd2781d08c0989555","6249b4ddd2781d08c0989222"],
 *               "members": ["8349b4ddd2781d08c0989111","8249b4ddd2781d08c0989000"],
 *               "description": 'Paris'
 *          },
 *       ]
 *     }
 * @apiError (404) UserNotFound  The id of the user wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *          "message": "User Not Found"
 *
 *     }
 */

/**
 * @api {get} /user/albums/:userId Get Albums
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
 *               "title": "Paris pics",
 *               "description": "Paris pics 2019"
 *               "creator": "2149b4ddd2781d08c09890a1",
 *               "views": 1023,
 *               "images": ["8349b4ddd2781d08c0989111","8249b4ddd2781d08c0989000"],
 *          },
 *       ]
 *     }
 * @apiError (404) UserNotFound  The id of the user wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *          "message": "User Not Found"
 *
 *     }
 *
 */
//////////////////////////////// KARIM ///////////////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /user/followUser Follow User
 * @apiName Follow User
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Following a user.
 * @apiParam {Number} userId The ID of the user to be followed
 * @apiParamExample {json} Request-Example:
 *{
 *       "userId": "5349b4ddd2781d08c09890f4"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *   {
 *
 *     }
 * @apiError (404) User Not Found
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Failed
 *     {
 *
 *        "message": "User Not Found"
 *
 *     }
 * @apiError (400) UserIdMissing This user is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "UserId is required"
 *     }
 *
 */

/**
 * @apiUse Authentication
 * @api {post} /user/unfollowUser Unfollow User
 * @apiName Unfollow User
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Following a user.
 * @apiParam {Number} userId The ID of the user to be unfollowed
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userId": "5349b4ddd2781d08c09890f4"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *   {
 *
 *     }
 * @apiError (404) User Not Found
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Failed
 *     {
 *        {
 *          "message": "User Not Found"
 *        }
 *     }
 * @apiError (400) UserIdMissing This user is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "UserId is required"
 *     }
 *
 */
/**
 * @api {get} /user/about/:userId Show About
 * @apiName Show User's About
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Showing the about page of a user.
 * @apiParam {Number} userId The ID of the user to show their about page
 * @apiParamExample {json} Request-Example:
 *{
 *       "userId": "5349b4ddd2781d08c09890f4"
 *     }
 * @apiSuccess {Object[]} showcase An array of objects containing the photos with its data
 * @apiSuccess {String} description User Description
 * @apiSuccess {Object} statistics User's Statistics
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "showcase": [
 *          {
 *               "_id": "5349b4ddd2781d08c09890f4",
 *               "tags": ["Tower","Egypt"],
 *               "views": 1023,
 *               "favouriteCount": 1023,
 *               "commentsNum": 1023,
 *               "creator": {
 *                   "firstName": "Ahmed",
 *                   "lastName": "Ibrahim"
 *               },
 *               "url": '',
 *               "title": 'Cairo Tower',
 *               "description": 'Cairo tower at the sunset'
 *          },
 *       ],
 *       "description": "A talented photographer",
 *       "statistics":
 *               {
 *                   "views": 27
 *                   "faves": 9
 *                   "groups": 10
 *               },
 *        "email": "asdasd@test.com",
 *        "occupation": "",
 *        "currentCity": "",
 *        "homeTown": "",
 *        "createdAt": ""
 *     }
 * @apiError (404) User Not Found
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Failed
 *     {
 *
 *          "message": "User Not Found"
 *
 *     }
 * @apiError (400) UserIdMissing This user is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "UserId is required"
 *     }
 */
/**
 * @api {get} /user/galleries/:userId Show Galleries
 * @apiName Show User's Galleries
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Showing the galleries of a user.
 * @apiParam {Number} userId The ID of the user to show their galleries
 * @apiParamExample {json} Request-Example:
 * {
 *       "userId": "5349b4ddd2781d08c09890f4"
 *     }
 * @apiSuccess {Object[]} galleries An array of objects containing the galleries of the user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "gallery": [
 *          {
 *               "_id": "5349b4ddd2781d08c09890f4",
 *               "views": 1023,
 *               "commentsNum": 1023,
 *               "creator": {
 *                   "firstName": "Ahmed",
 *                   "lastName": "Ibrahim"
 *               },
 *               "title": 'Cairo Tower',
 *               "description": 'Cairo tower at the sunset'
 *               "itemsNum": 27
 *          },
 *       ],
 *     }
 *  @apiError (404) User Not Found
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Failed
 *     {
 *
 *          "message": "User Not Found"
 *
 *     }
 */
/**
 * @apiUse Authentication
 * @apiUse photoObjects
 * @api {get} /user/cameraRoll/:userId User Camera Roll
 * @apiName Show User Camera Roll
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Return User's Camera Roll
 * @apiSuccess {Object[]} cameraRoll An array of objects containing the photos with its data
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "cameraRoll": [
 *          {
 *             "_id": "5349b4ddd2781d08c09890f4",
 *               "tags": ["Tower","Egypt"],
 *               "views": 1023,
 *               "favouriteCount": 1023,
 *               "commentsNum": 1023,
 *               "creator": {
 *                   "firstName": "Ahmed",
 *                   "lastName": "Ibrahim"
 *               },
 *               "url": '',
 *               "title": 'Cairo Tower',
 *               "description": 'Cairo tower at the sunset'
 *          },
 *       ],
 *     }
 * @apiParamExample {json} Request-Example:
 * {
 *     userId: "5349b4ddd2781d08c09890f4"
 * }
 *
 * @apiError (404) UserNotFound  The id of the user wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *          "message": "User Not Found"
 *
 *     }
 */

/**
 * @apiUse Authentication
 * @api {post} /user/editCoverPhoto Edit Cover Photo
 * @apiName Change User's Cover Photo
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Return User's Camera Roll
 * @apiParam {String} photoId Photo to set as cover photo
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *     }
 * @apiParamExample {json} Request-Example:
 * {
 *     photoId: "5349b4ddd2781d08c09890f4"
 * }
 *
 * @apiError (404) PhotoNotFound  The id of the Photo wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *          "message": "Photo Not Found"
 *
 *     }
 */
