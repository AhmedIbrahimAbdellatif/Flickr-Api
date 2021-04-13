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