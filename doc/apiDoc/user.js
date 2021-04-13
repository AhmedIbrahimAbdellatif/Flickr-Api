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