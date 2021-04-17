/**
 * Album Endpoints
 */
/////////////////////////////HIMA//////////////////////////

////////////////////////////////GHALLAB//////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /albums/:userId/         Add photo to album
 * @apiName Add photo to album
 * @apiGroup Album
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} photoId
 * @apiParam  {String} albumId
 * @apiSuccess (200)
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     photoId : "5349b4ddd2781d08c09890f4"
 *     albumId : "5349b4ddd2781d08c09890f4"
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
 * @apiError (404) Album Not Found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Album Not Found"
 *     }
 *
 */
