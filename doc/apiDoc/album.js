/**
 * Album Endpoints
 */
/////////////////////////////HIMA//////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /album/createAlbum Create a new album
 * @apiName Create Album
 * @apiGroup Album
 * @apiVersion 1.0.0
 * @apiDescription Create a new album
 * @apiParam {String} title title for the new album
 * @apiParam {String} description description for the new album
 * @apiParamExample {json} Request-Example:
 *     {
 *       "title": "Paris Pics",
 *       "description": "Pics of Paris 2019"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 */
/**
 * @apiUse Authentication
 * @api {delete} /album/:albumId Delete an album
 * @apiName Create Album
 * @apiGroup Album
 * @apiVersion 1.0.0
 * @apiDescription Delete an existing album
 * @apiParam {String} albumId Album Id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 * @apiError (404) AlbumNotFound  The id of the album wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *          "message": "Album Not Found"
 *
 *     }
 */
/**
 * @apiUse Authentication
 * @api {patch} /album/:albumId Edit an album
 * @apiName Edit Album
 * @apiGroup Album
 * @apiVersion 1.0.0
 * @apiDescription Edit Title and/or description of an album
 * @apiParam {String} albumId Album to be edited
 * @apiParam {String} title New title for the album
 * @apiParam {String} description New description for the album
 * @apiParamExample {json} Request-Example:
 *      {
 *          "title": "Championship Photos",
 *          "description": "Semi-final photos"
 *      }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 * @apiError (404) AlbumNotFound The id of the album wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *          "message": "Album Not Found"
 *
 *     }
 */
/**
 * @api {get} /album/:albumId Get album media
 * @apiName Get Album Media
 * @apiGroup Album
 * @apiVersion 1.0.0
 * @apiDescription Get album media
 * @apiParam {String} albumId Album to view its media
 * @apiSuccess {Object[]} media An array of objects containing the photos with its data
 * @apiSuccessExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "media": [
 *          {
 *              "_id": "5349b4ddd2781d08c09890f4",
 *               "tags": [{
 *                  "_id": "12321",
 *                  "name": "Gamed",
 *                  "count": 1
 *              }],
 *               "views": 1023,
 *               "favouritesNum": 1023,
 *               "commentsNum": 1023,
 *               "creator": {
 *                   "firstName": "Ahmed",
 *                   "lastName": "Ibrahim"
 *               },
 *              'url': '',
 *              'title': 'Cairo Tower',
 *              'description': 'Cairo tower at the sunset',
 *              "isPublic": false,
 *              "allowCommenting": true
 *          },
 *       ]
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *          "message": "Album Not Found"
 *
 *     }
 */
////////////////////////////////GHALLAB//////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /album/addPhoto         Add photo to album
 * @apiName Add photo to album
 * @apiGroup Album
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} photoId
 * @apiParam  {String} albumId
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
/**
 * @apiUse Authentication
 * @api {post} /album/removePhoto         Remove photo from album
 * @apiName Remove photo from album
 * @apiGroup Album
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} photoId
 * @apiParam  {String} albumId
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
 *     message : "Photo removed successfully"
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
