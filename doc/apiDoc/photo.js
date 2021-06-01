/**
 * Photo Endpoints
 */
////////////////////////////////////GHALLAB////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /photo/editPhotoLicense         Edit License of a photo
 * @apiName Edit License of a photo
 * @apiGroup Photo
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} License  Type of license you want
 * @apiParam  {String} photoId  photoId to change its license
 
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     "license" : "All rights reserved",
 *      "photoId": "safasfasdfae34q32qwe"
 * }
 * @apiError (404) image not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "message": "This image is not found"
 *     }
 *
 * @apiError (404) User not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "message": "This user is not found"
 *     }
 */
/**
 *
 * @api {get} /photo/search/:searchText        Search by license
 * @apiName Search by license
 * @apiGroup Photo
 * @apiVersion  1.0.0
 * @apiParam  {String} searchText  Text to search by
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     "searchText" : "All rights reserved",
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     photos : [
 *               {
 *                url : String
 *                title : String
 *                creator : String
 *                favouriteCount : Number
 *                commentsNum : Number
 *               },
 *               {
 *                url : String
 *                title : String
 *                creator : String
 *                favouriteCount : Number
 *                commentsNum : Number
 *               },
 *               {
 *                url : String
 *                title : String
 *                creator : String
 *                favouriteCount : Number
 *                commentsNum : Number
 *               },
 *              ]
 * }
 */
/**
 *
 * @api {get} /photo/explore Explore Photos
 * @apiName Explore Recent Photos
 * @apiGroup Photo
 * @apiVersion  1.0.0
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "photos" : [
 *               {
 *                "url" : String,
 *                "title" : String,
 *                "creator" : {
 *                  "firstName": "Abdelrahman",
 *                  "lastName": "Shahda"
 *                },
 *                "favouriteCount" : Number
 *                "commentsNum" : Number
 *               },
 *
 *              ]
 * }
 */
/**
 * @apiUse Authentication
 * @api {delete} /photo        Delete Photo
 * @apiName Delete Photo
 * @apiGroup Photo
 * @apiVersion  1.0.0
 * @apiParam  {String} photoId Photo to be deleted
 * @apiParamExample  {json} Request-Example:
 * {
 *     photoId : "5349b4ddd2781d08c09890f4"
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *     message : "Photo with ID 5349b4ddd2781d08c09890f4 is deleted"
 * }
 *
 * @apiError (404) Photo Not Found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Photo Not Found"
 *     }
 *
 * @apiError (404) User not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "message": "This user is not found"
 *     }
 */
/**
 *
 * @api {post} /photo/getComments Get Photo Comments
 * @apiName Get Media Comments
 * @apiGroup Photo
 * @apiVersion  1.0.0
 * @apiParam  {String} photoId Photo Required to get its comments
 * @apiParamExample  {json} Request-Example:
 * {
 *     "photoId" : "5349b4ddd2781d08c09890f4"
 * }
 * @apiSuccess (200) {Object[]} Comments Array of Comment Objects
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "comments": [
 *       {
 *           "_id": "60b5df64bc0b9e3c283fa482",
 *           "user": {
 *               "_id": "60b5a1cf64664624dc23098f",
 *               "profilePhotoUrl": "http://localhost:3000/public/images/default/8.jpeg",
 *               "firstName": "Abdelrhman",
 *               "lastName": "Shahda",
 *               "userName": "coolabdoana",
 *               "id": "60b5a1cf64664624dc23098f",
 *               "numberOfFollowers": 0
 *           },
 *           "text": "This is Very Cool!",
 *           "photo": "60b5969764664624dc230989",
 *           "createdAt": "2021-06-01T07:19:00.427Z",
 *           "updatedAt": "2021-06-01T07:19:00.427Z",
 *           "__v": 0,
 *           "id": "60b5df64bc0b9e3c283fa482"
 *       },
 *       {
 *           "_id": "60b5df67bc0b9e3c283fa483",
 *           "user": {
 *               "_id": "60b5a1cf64664624dc23098f",
 *               "profilePhotoUrl": "http://localhost:3000/public/images/default/8.jpeg",
 *               "firstName": "Abdelrhman",
 *               "lastName": "Shahda",
 *               "userName": "coolabdoana",
 *               "id": "60b5a1cf64664624dc23098f",
 *               "numberOfFollowers": 0
 *           },
 *           "text": "This is Very Cool!",
 *           "photo": "60b5969764664624dc230989",
 *           "createdAt": "2021-06-01T07:19:03.937Z",
 *           "updatedAt": "2021-06-01T07:19:03.937Z",
 *           "__v": 0,
 *           "id": "60b5df67bc0b9e3c283fa483"
 *       },
 *       {
 *           "_id": "60b5df70bc0b9e3c283fa484",
 *           "creator": {
 *               "_id": "60b5a1cf64664624dc23098f",
 *               "profilePhotoUrl": "http://localhost:3000/public/images/default/8.jpeg",
 *               "firstName": "Abdelrhman",
 *               "lastName": "Shahda",
 *               "userName": "coolabdoana",
 *               "id": "60b5a1cf64664624dc23098f",
 *               "numberOfFollowers": 0
 *           },
 *           "text": "Nice Photo",
 *           "photo": "60b5969764664624dc230989",
 *           "createdAt": "2021-06-01T07:19:12.123Z",
 *           "updatedAt": "2021-06-01T07:19:12.123Z",
 *           "__v": 0,
 *           "id": "60b5df70bc0b9e3c283fa484"
 *       }
 *   ]
 *}
 * @apiError (400) PhotoIDMissing   PhotoID is Missing
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "message": "Photo Id is missing"
 *     }
 * @apiError (404) PhotoNotFound
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Photo Not Found"
 *     }
 */
/**
 *
 * @api {post} /photo/:photoId/comment Comment on Photo
 * @apiName Comment On a photo
 * @apiGroup Photo
 * @apiVersion  1.0.0
 * @apiParam  {String} The Comment to be added
 * @apiParamExample  {json} Request-Example:
 * {
 *     comment : "Awesome"
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *     message : "Comment Added Successfully"
 * }
 *
 * @apiError (400) MissingComment   Provide a comment
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "message": "Please write your Comment"
 *     }
 *
 * @apiError (404) PhotoNotFound
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Photo Not Found"
 *     }
 */
/**
 * @apiUse Authentication
 * @api {delete} /photo/:photoId/comment Delete Comment
 * @apiName Delete Comment
 * @apiGroup Photo
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} commentId The ID of the comment required to be deleted
 *
 * @apiSuccess (200) {String} message Comment Deleted
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     "commentId" : "60b5969764664624dc230989"
 * }
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *     "message" : "Comment Deleted Successfully",
 * }
 * @apiError (400) CommentIDMissing Comment ID is Missing or invalid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message" : "Comment ID Missing"
 *     }
 * @apiError (404) CommentNotFound The comment is not found maybe already deleted
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "Comment Not Found"
 *     }
 * @apiError (404) PhotoNotFound
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "Photo Not Found"
 *     }
 * @apiError (403) NotAllowed You have no authority on this comment it must be created by you to be deleted
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "message" : "You do not have permission to delete comments belonging to other users"
 *     }
 */
/////////////////////////////////SHAHDA///////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /photo/addToGroup Add Photo To Group
 * @apiName Add Photo To Group
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription Add Photo To Group in which User is admin
 * @apiParam {String} photoId Photo to be added to group
 * @apiParam {String} groupId Group to which photo will be added
 * @apiParamExample {json} Request-Example:
 * {
 *     "photoId": "5349b4ddd2781d08c09890f4",
 *     "groupId": "5349b4ddd2781d08c09890f4"
 * }
 * @apiError (404) PhotoNotFound  The Photo isn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "Photo Not Found"
 *        }
 *     }
 *  
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "5349b4ddd2781d08c09890f4",
 *         "tags": ["Tower","Egypt"],
 *         "views": 1023,
 *         "favouriteCount": 1023,
 *         "commentsNum": 1023,
 *         "creator": {
 *                "_id": "123123",
 *                "isFollowing": false,
 *               "firstName": "Ahmed",
 *               "lastName": "Ibrahim",
 *               "userName": "",
 *               "profilePhotoUrl":"",
 *               "coverPhotoUrl": ""
 *          },
 *          "url": '',
 *          "title": 'Cairo Tower',
 *          "description": 'Cairo tower at the sunset',
 *          "createdAt": "Date"
 *          
 *       
 *     }
 */
/**
 * @apiUse AuthenticationOptional
 * @api {post} /photo/getDetails Get Photo Details
 * @apiName Get Photo Details
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription Get Photo Details 
 * @apiParam {String} photoId Photo to be added to group
 * @apiParamExample {json} Request-Example:
 * {
 *     "photoId": "5349b4ddd2781d08c09890f4",
 * }
 * 
 * @apiError (404) PhotoNotFound  The Photo isn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "Photo Not Found"
 *        }
 *     }
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "5349b4ddd2781d08c09890f4",
 *         "tags": ["Tower","Egypt"],
 *         "views": 1023,
 *         "favouriteCount": 1023,
 *         "commentsNum": 1023,
 *         "creator": {
 *                "_id": "123123",
 *                "isFollowing": false,
 *               "firstName": "Ahmed",
 *               "lastName": "Ibrahim",
 *               "userName": "",
 *               "profilePhotoUrl":"",
 *               "coverPhotoUrl": ""
 *          },
 *          "url": '',
 *          "title": 'Cairo Tower',
 *          "description": 'Cairo tower at the sunset',
 *          "createdAt": "Date"
 *          
 *       
 *     }


 */
///////////////////////////////HIMA/////////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /photo/upload Upload a photo
 * @apiName Upload Photo
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription Upload a photo by an authenticated user
 * @apiParam {String} photo A binary object containing the uploaded photo
 * @apiParam {Boolean} isPublic Boolean to control if it's a public or a private photo
 * @apiParam {String} title Title for the uploaded photo
 * @apiParam {Boolean} allowCommenting Boolean to allow for commenting on the photo
 * @apiParam {String} contentType Type of the uploaded Photo
 * @apiParam {String} license License of the photo
 * @apiParam {String} safety Safety of the photo
 *
 * @apiParam {String} description Description for the uploaded photo
 * @apiParamExample {json} Request-Example:
 *     {
 *       "photo" : <binary data>,
 *       "isPublic": true,
 *       "title": "Cairo Tower",
 *       "allowCommenting": true,
 *        "license": "",
 *        "contentType":'',
 *        "safetyOption":'',
 *       "description": "A photo of Cairo tower at the sunset"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "url": String
 *     }
 * @apiError (400) PhotoMissing This Photo is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "Photo is required"
 *     }
 * @apiError (400) TitleMissing This Photo Title is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "Title is required"
 *     }
 *  @apiError (400) ContentTypeMissing This Photo ContentType is required
 *  @apiError (400) isPublicWrongFormat This Photo isPublic should be boolean
 *  @apiError (400) AllowCommentingWrongFormat This Photo Allow Commenting should be boolean
 *  @apiError (400) LicenseWrongFormat This Photo License should be string
 *  @apiError (400) DescriptionWrongFormat This Photo description should be string
 *  @apiError (400) SafetyOptionWrongFormat This Photo SafetyOption should be string
 *  @apiError (400) FileExtension Invalid File extension
 *  @apiError (400) FileSizeLimit Something Went Wrong
 *
 */
///////////////////////////////////////// KARIM ///////////////////////////////////////////
/**
 * * @apiUse Authentication
 * @api {post} /photo/privacy Adjust Privacy
 * @apiName Adjust Privacy
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription Adjust privacy of the photo
 * @apiParam {String} photoId ID of the photo whose privacy is to be adjusted
 * @apiParamExample {json} Request-Example:
 * {
 *     photoId: "5349b4ddd2781d08c09890f4"
 *     isPublic: true
 * }
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * }
 * @apiError (404) PhotoNotFound  The id of the photo wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       
 *          "message": "Photo Not Found"
 *        
 *     }
 
/** 
* 
 * @apiUse Authentication
 * @api {post} /photo/allowCommenting Allow Commenting
 * @apiName Allow commenting
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription Allow comments
 * @apiParam {String} photoId ID of the photo to allow comments on
 * @apiParamExample {json} Request-Example:
 * {
 *     photoId: "5349b4ddd2781d08c09890f4"
 *     allowCommenting: false
 * }
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * }
 * @apiError (404) PhotoNotFound  The id of the photo wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       
 *          "message": "Photo Not Found"
 *        
 *     }
 *  
 * 
*/

////////////////////////////////HIMA//////////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /photo/addToFavorites Add to Favorites
 * @apiName Add to Favorites
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription Add a photo to favorites
 * @apiParam {String} photoId ID of the photo to be added to favorites
 * @apiParamExample {json} Request-Example:
 * {
 *     photoId: "60953562224d432a505e8d07"
 * }
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 * }
 * @apiError (404) PhotoNotFound  The id of the photo wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *      "message": "Photo Not Found"
 *
 *     }
 * @apiError (400) PhotoIdMissing This Photo is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "PhotoId is required"
 *     }
 *
 */
/////////////////////////KARIM//////////////////////////
/**
 * @apiUse Authentication
 * @api {patch} /photo/addTags/:photoId Add Tags
 * @apiName Add Tags
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription Add more tags to a media
 * @apiParam {String} tag The text to be added as a tag
 * @apiParamExample {json} Request-Example:
 * {
 *     tag: "Sunset"
 * }
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     message: "Tag Added to photo successfully"
 * }
 * @apiError (400) TagRequired  The Tag Name is Missing
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "message": "Tag name is required"
 *     }
 * @apiError (400) PhotoIdInvalid  PhotoId in params is invalid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "message": "PhotoId is required"
 *     }
 * @apiError (404) PhotoNotFound  The id of the photo wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Photo Not Found"
 *     }
 * @apiError (409) TagAlreadyInPhoto  The added tag is already added to this photo
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *          "message": "Tag already exists in this photo add another tag"
 *     }
 */
////////////////////////////////HIMA////////////////////
/**
 * @apiUse AuthenticationOptional
 * @api {get} /photo/whoFavortied/:photoId See who favorited
 * @apiName See who favorited
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription View who made a certain media favorite
 * @apiParam {String} photoId ID of the photo
 * @apiParamExample {json} Request-Example:
 * {
 *     photoId: "60953562224d432a505e8d07"
 * }
 * @apiSuccess {Object[]]} user Array of users who made the media favorite
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "user":[
 *          {
 *                "_id":'60953562224d432a505e8d07',
 *              "firstName":'Ahmed',
 *              "lastName":'Ibrahim'
 *              "profilePhotoUrl": "https://img.jpg",
 *              "numberOfPhotos": 123,
 *              "numberOfFollowers": 123,
 *              "isFollowing": false,
 *              "createdAt":  String 
 * }
 * ]
 * }
 * @apiError (404) PhotoNotFound  The id of the photo wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *          "message": "Photo Not Found"
 *
 *     }
 * @apiError (400) PhotoIdMissing This PhotoId is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "PhotoId is required"
 *     }
 *
 */
/**
 * @apiUse photoObjects
 * @api {get} /photo/searchPhotos/:searchText Search Photos
 * @apiName Search on Photos
 * @apiGroup Photo
 * @apiVersion 1.0.0
 * @apiDescription Search on photos using tags or title
 * @apiParam {String} searchText The text to search with
 * @apiParamExample {json} Request-Example:
 * {
 *    searchText: "Eiffel Tower"
 * }
 * @apiSuccess {Object[]} media An array of objects containing the photos with its data
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "media": [
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
 *     }
 * @apiError (404) PhotoNotFound  The id of the photo wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *          "message": "Photo Not Found"
 *
 *     }
 *
 */
