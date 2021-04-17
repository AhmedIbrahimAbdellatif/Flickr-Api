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
////////////////////////////GHALLAB///////////////////////////
/**
 *
 * @api {post} /user/login Login using Facebook
 * @apiName Facebook Login
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} loginType  a string containing type of login ex:"Facebook"
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     loginType : "Facebook"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     {
 *       status: 'connected', The person is logged into Facebook, and has logged into your webpage.
 *                            not_authorized    The person is logged into Facebook, but has not logged into your webpage.
 *                            unknown   The person is not logged into Facebook, so you don't know if they have logged into your webpage.
 *       authResponse: {
 *       accessToken: '{access-token}',   An access token for the person using the webpage
 *       expiresIn:'{unix-timestamp}',    A UNIX time stamp when the token expires. Once the token expires, the person will need to login again.
 *       reauthorize_required_in:'{seconds-until-token-expires}',   The amount of time before the login expires, in seconds, and the person will need to login again.
 *       signedRequest:'{signed-parameter}',    A signed parameter that contains information about the person using your webpage.
 *       userID:'{user-id}'   The ID of the person using your webpage.
 *   }
 * }
 * }
 *
 *
 */
/**
 *
 * @api {get} /user/followers/:userId  Get the followers of a certain User
 * @apiName Get User Followers
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} userId   ID of User which is required to show his followers
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
 *     followers : [
 *                  {
 *                    userId : String
 *                    firstName : String
 *                    lastName : String
 *                  },
 *                  {
 *                    userId : String
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
 *                    userId : String
 *                    firstName : String
 *                    lastName : String
 *                  },
 *                  {
 *                    userId : String
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
 *
 */

/**
 *
 * @api {get} /user/search/:username     Search on user //username is the keyword you want to search for
 * @apiName Search on user
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
 * @api {post} /users/:userId   Edit Showcase and Description
 * @apiName Edit Showcase and Description
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} description    The user's Description
 * @apiparam  {String} Showcase       The user's Showcase
 *
 * @apiSuccess (200)
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     desciption : "Photos are my passion"
 *     showcase : "a glimpse of my life"
 * }
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *     message : "Changed Successfully"
 * }
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
 *       "photoUrl": 'https://www.google.com/photo'
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
/////////////////////////////////////////HIMA/////////////////////////////////
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
 * 
 * /   
//////////////////////////////// KARIM ///////////////////////////////////  
/**
 *  @api {post} /user/signUp Sign Up
  * @apiName Sign Up
  * @apiGroup User
  * @apiVersion 1.0.0
  * @apiDescription Creating a new account.
  * @apiParam {String} email User's Email
  * @apiParam {String} password User's Password
  * @apiParam {String} firstName User's First Name
  * @apiParam {String} lastName User's Last Name
  * @apiParam {Number} age User's Age
  * @apiParamExample {json} Request-Example:
  *{    
  *       "email": "user@email.com",
  *       "firstName": "User",
  *      "lastName": "User",
  *       "age": 18,      
  *     }
  
 * @apiSuccess {Object} user
 * @apiSuccess {String} user.email User's Email
 * @apiSuccess {String} user.firstName User's First Name
 * @apiSuccess {String} user.lastName User's Last Name
 * @apiSuccess {String} user.accessToken  User's Access Token
 * @apiSuccess {Number} user.age User's Age
 * @apiSuccess {String} user._id User's Id
 * @apiSuccess {Number} user.followers User's Followers
 * @apiSuccess {Number} user.following User's Following
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 OK
 *   {
 *       "_id": "5349b4ddd2781d08c09890f4",
 *       "email": "user@email.com",
 *       "firstName": "User",
 *      "lastName": "User",
 *       "accessToken": "skdnksd7474g3kdbjfhf34",
 *       "age": 18,
 *       "followers": 63,
 *       "following": 55,
 *       
 *     }
 * @apiError (400) UserExists  The Email is already registered
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Failed
 *     {
 *       "error": {
 *          "message": "User Already Exists"
 *        }
 *     }
 * /
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
 *       "error": {
 *          "message": "User Not Found"
 *        }
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
                "_id": "5349b4ddd2781d08c09890f4",
                "tags": ["Tower","Egypt"],
                "views": 1023,
                "favouritesNum": 1023,
                "commentsNum": 1023,
                "creator": {
                    "firstName": "Ahmed",
                    "lastName": "Ibrahim"
                },
                "url": '',
                "title": 'Cairo Tower',
                "description": 'Cairo tower at the sunset'
 *          },
                
 *       ],
        "description": "A talented photographer",
        "statistics": 
                {
                    "views": 27
                    "faves": 9
                    "groups": 10
                }
 *     }
 * @apiError (404) User Not Found
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Failed
 *     {
 *       "error": {
 *          "message": "User Not Found"
 *        }
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
                "_id": "5349b4ddd2781d08c09890f4",
                "views": 1023,
                "commentsNum": 1023,
                "creator": {
                    "firstName": "Ahmed",
                    "lastName": "Ibrahim"
                },
                "title": 'Cairo Tower',
                "description": 'Cairo tower at the sunset'
                "itemsNum": 27
                coverImageUrl: '',
 *          },            
 *       ],
 *     }
 *  @apiError (404) User Not Found
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Failed
 *     {
 *       "error": {
 *          "message": "User Not Found"
 *        }
 *     }
 * /
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
                "_id": "5349b4ddd2781d08c09890f4",
                "tags": ["Tower","Egypt"],
                "views": 1023,
                "favouritesNum": 1023,
                "commentsNum": 1023,
                "creator": {
                    "firstName": "Ahmed",
                    "lastName": "Ibrahim"
                },
                "url": '',
                "title": 'Cairo Tower',
                "description": 'Cairo tower at the sunset'
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
 *       "error": {
 *          "message": "User Not Found"
 *        }
 *     }
 
 */


