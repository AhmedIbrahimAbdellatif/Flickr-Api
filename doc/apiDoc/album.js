/**
 * Album Endpoints
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
 * @api {post} /album/createAlbum Create a new album
 * @apiName Create Album
 * @apiGroup Album
 * @apiVersion 1.0.0
 * @apiDescription Create a new album
 * @apiParam {String} albumTitle title for the new album
 * @apiParam {String} albumDescription description for the new album
 * @apiParamExample {json} Request-Example:
 *     {
 *       "albumTitle": "Paris Pics",
 *       "albumDescription": "Pics of Paris 2019"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
*/
/** 
 * @apiUse Authentication
 * @api {delete} /album/:id Delete an album
 * @apiName Create Album
 * @apiGroup Album
 * @apiVersion 1.0.0
 * @apiDescription Delete an existing album
 * @apiParam {String} id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 * @apiError (404) AlbumNotFound  The id of the album wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "Album Not Found"
 *        }
 *     }
*/
/** 
 * @apiUse Authentication
 * @api {patch} /album/:id Edit an album
 * @apiName Edit Album
 * @apiGroup Album
 * @apiVersion 1.0.0
 * @apiDescription Edit Title and/or description of an album
 * @apiParam {String} id Album to be edited
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
 *       "error": {
 *          "message": "Album Not Found"
 *        }
 *     }
*/
/** 
 * @api {get} /album/:id Get album media
 * @apiName Get Album Media
 * @apiGroup Album
 * @apiVersion 1.0.0
 * @apiDescription Get album media
 * @apiParam {String} id Album to view its media
 * @apiSuccess {Object[]} media An array of objects containing the photos with its data
 * @apiSuccessExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "media": [
 *          {
 *              "_id": "5349b4ddd2781d08c09890f4",
                "tags": ["Tower","Egypt"],
                "views": 1023,
                "favouritesNum": 1023,
                "commentsNum": 1023,
                "creator": {
                    "firstName": "Ahmed",
                    "lastName": "Ibrahim"
                },
 *              'photo': <binary data>,
 *              'title': 'Cairo Tower',
 *              'description': 'Cairo tower at the sunset'
 *          },
 *       ]
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "Album Not Found"
 *        }
 *     }
*/