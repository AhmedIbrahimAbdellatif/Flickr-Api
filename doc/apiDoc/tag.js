/**
 * Tag Endpoints
 */
/**
 * @api {get} /tag/trending Get trending tags
 * @apiName Get Trending Tags
 * @apiGroup Tag
 * @apiVersion 1.0.0
 * @apiDescription View Tags that has a count greater than a certain number
 * @apiSuccess {Object[]} trendingTags An array of objects containing tags data
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "trendingTags": [
 *              {
 *                  "count": 120,
 *                  "_id": "5349b4ddd2781d08c09890f4",
 *                  "name": "nature"
 *              }
 *          ]
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *       "message": "Tag name is required"
 *
 *     }
 */

/**
 * @api {get} /tag/:tagName Get tag media
 * @apiName Get Tag Media
 * @apiGroup Tag
 * @apiVersion 1.0.0
 * @apiDescription Get tag media
 * @apiParam {String} Name of the Tag requested it's media
 * @apiSuccess {Object[]} media An array of objects containing the photos with its data
 * @apiSuccessExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "media": [
 *          {
 *               "_id": "5349b4ddd2781d08c09890f4",
 *               "tags": ["Tower","Egypt"],
 *               "views": 1023,
 *               "favouritesNum": 1023,
 *               "commentsNum": 1023,
 *               "creator": {
 *                   "firstName": "Ahmed",
 *                   "lastName": "Ibrahim"
 *               },
 *               "url": '',
 *               "title": 'Cairo Tower',
 *               "description": 'Cairo tower at the sunset'
 *          },
 *       ]
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *       "message": "Tag Not Found"
 *
 *     }
 */
