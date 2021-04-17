/**
 * Tag Endpoints
 */
/**
 * @api {get} /tag/trending Get trending tags
 * @apiName Get Trending Tags
 * @apiGroup Tag
 * @apiVersion 1.0.0
 * @apiDescription View trending tags
 * @apiSuccess {Object[]} trendingTags An array of objects containing tags data
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "trendingTags": [
 *              {
 *                  "_id": "5349b4ddd2781d08c09890f4",
 *                  "count": 120,
 *                  "name": "nature"
 *              }
 *          ]
 *     }
 */

/** 
 * @api {get} /tag/:id Get tag media
 * @apiName Get Tag Media
 * @apiGroup Tag
 * @apiVersion 1.0.0
 * @apiDescription Get tag media
 * @apiParam {String} id Tag to view its media
 * @apiSuccess {Object[]} media An array of objects containing the photos with its data
 * @apiSuccessExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "media": [
 *          {
                "_id": "5349b4ddd2781d08c09890f4",
                "tags": ["Tower","Egypt"],
                "views": 1023,
                "favouritesNum": 1023,
                "commentsNum": 1023,
                "creator": {
                    "firstName": "Ahmed",
                    "lastName": "Ibrahim"
                },
                "photo": <binary data>,
                "title": 'Cairo Tower',
                "description": 'Cairo tower at the sunset'
 *          },
 *       ]
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "Tag Not Found"
 *        }
 *     }
*/
