/**
 * Gallery Endpoints
 */
/**
 * @apiDefine Authentication
 * @apiHeader {String} Authorization Users access-token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer asdasdkasdliuaslidas"
 *     }
 */
/////////////////////////////////GHALLAB///////////////////////
/**
 * @apiUse Authentication
 * @api {post} /gallery/addPhoto         Add photo to gallery
 * @apiName Add photo to gallery
 * @apiGroup Gallery
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} photoId
 * @apiParam  {String} galleryId
 * @apiParamExample  {json} Request-Example:
 * {
 *     photoId : "5349b4ddd2781d08c09890f4"
 *     galleryId : "5349b4ddd2781d08c09890f4"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     message : "Photo added successfully"
 * }
 *
 * @apiError (404) Photo Not Found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Photo Not Found"
 *     }
 * @apiError (404) gallery Not Found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "gallery Not Found"
 *     }
 *
 */
/**
 * @apiUse Authentication
 * @api {post} /gallery/removePhoto         Remove photo from gallery
 * @apiName Remove photo from gallery
 * @apiGroup Gallery
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} photoId
 * @apiParam  {String} galleryId
 * @apiParamExample  {json} Request-Example:
 * {
 *     photoId : "5349b4ddd2781d08c09890f4"
 *     galleryId : "5349b4ddd2781d08c09890f4"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     message : "Photo added successfully"
 * }
 *
 * @apiError (404) Photo Not Found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Photo Not Found"
 *     }
 * @apiError (404) gallery Not Found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "gallery Not Found"
 *     }
 *
 */
