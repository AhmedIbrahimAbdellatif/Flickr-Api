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
 * @api {post} /users/login Login using Facebook
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
 * @api {get} /users/:userId/followers  Get the followers of a certain User
 * @apiName Get User Followers
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} userId   ID of User which is required to show his followers
 *
 * @apiSuccess (200)
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     userId : "5349b4ddd2781d08c09890f4"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
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
 * @api {get} /users/:userId/followings  Get the followings of a certain User
 * @apiName Get User Followings
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} userId   ID of User which is required to show his followings
 *
 * @apiSuccess (200)
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     userId : "5349b4ddd2781d08c09890f4"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
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
 * @api {get} /search/users/:username     Search on user //username is the keyword you want to search for
 * @apiName Search on user
 * @apiGroup User
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} keyWord    any word to be matched with user names in the DB
 *
 * @apiSuccess (200)
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     keyWord : "Ghallab"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
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

