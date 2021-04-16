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