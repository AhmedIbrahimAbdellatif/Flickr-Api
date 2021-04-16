/**
 * Photo Endpoints
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
 * @apiDefine Authentication
 * @apiHeader {String} Authorization Users access-token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer asdasdkasdliuaslidas"
 *     }
 */
////////////////////////////////////GHALLAB////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /photos/:userId/:imageUrl         Edit License of a photo
 * @apiName Edit License of a photo
 * @apiGroup Photo
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} License  Type of license you want
 *
 * @apiSuccess (200)
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     license : "All rights reserved"
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
 * @api {get} /search/:text&license        Search by license
 * @apiName Search by license
 * @apiGroup Photo
 * @apiVersion  1.0.0
 *
 *
 * @apiSuccess (200)
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     photos : [
 *               {
 *                url : String
 *                title : String
 *                creator : String
 *                favouritesNum : Number
 *                commentsNum : Number
 *               },
 *               {
 *                url : String
 *                title : String
 *                creator : String
 *                favouritesNum : Number
 *                commentsNum : Number
 *               },
 *               {
 *                url : String
 *                title : String
 *                creator : String
 *                favouritesNum : Number
 *                commentsNum : Number
 *               },
 *              ]
 * }
 */
/**
 * @apiUse Authentication
 * @api {delete} /photos/:userId        Delete Photo
 * @apiName Delete Photo
 * @apiGroup Photo
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} photoId
 *
 * @apiSuccess (200)
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     photoId : "5349b4ddd2781d08c09890f4"
 * }
 *
 *
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
 * @api {post} /photos/:photoId         Comment on Media
 * @apiName Comment On a photo
 * @apiGroup Photo
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} comment The Comment to be added
 * @apiParam  {String} photoId
 * @apiSuccess (200)
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     photoId : "5349b4ddd2781d08c09890f4",
 *     comment : "Awesome"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     message : "Comment Added Successfully"
 * }
 *
 * @apiError (404) Photo Not Found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Photo Not Found"
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
 * @apiError (404) GroupNotFound  The Group isn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "Group Not Found"
 *        }
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
 * @apiParam {String} description Description for the uploaded photo
 * @apiParamExample {json} Request-Example:
 *     {
 *       "photo" : <binary data>,
 *       "isPublic": true,
 *       "title": "Cairo Tower",
 *       "allowCommenting": true,
 *       "description": "A photo of Cairo tower at the sunset"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {}
 */
