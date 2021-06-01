/**
 * Tag Endpoints
 */
/**
 * @api {get} /tag/trending Get trending tags
 * @apiName Get Trending Tags
 * @apiGroup Tag
 * @apiVersion 1.0.0
 * @apiDescription View Tags that has a count greater than a certain number (3 times)
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
 */
/**
 * @api {get} /tag/search/:searchKeyword Search for tag
 * @apiName Search for tag
 * @apiGroup Tag
 * @apiVersion 1.0.0
 * @apiDescription View Tags that has a count greater than a certain number
 * @apiSuccess {Object[]} trendingTags An array of objects containing tags data
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "searchResult": [
 *              {
 *                  "count": 120,
 *                  "_id": "5349b4ddd2781d08c09890f4",
 *                  "name": "nature"
 *              }
 *          ]
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
 *      "media": [
 *       {
 *           "description": "",
 *           "tags": [
 *               "60b596e63e57db3fe858f46c",
 *               "60b596ec3e57db3fe858f46d",
 *               "60b596f03e57db3fe858f46e"
 *           ],
 *           "comments": [
 *               "60b5df64bc0b9e3c283fa482",
 *               "60b5df67bc0b9e3c283fa483",
 *               "60b5df70bc0b9e3c283fa484",
 *               "60b5e3317214fe0f8485fa89",
 *               "60b5e33e7214fe0f8485fa8a",
 *               "60b5e33f7214fe0f8485fa8b"
 *           ],
 *           "views": 0,
 *           "favouriteCount": 0,
 *           "isPublic": true,
 *           "license": "None",
 *           "safety": "Safe",
 *           "allowCommenting": true,
 *           "_id": "60b5969764664624dc230989",
 *           "albums": [],
 *           "contentType": "Photo",
 *           "title": "test100",
 *           "url": "http://localhost:3000/public/images/60b48a649f4f7a3e5c45aee4/60b5969764664624dc230988.png",
 *           "creator": "60b48a649f4f7a3e5c45aee4",
 *           "createdAt": "2021-06-01T02:08:23.334Z",
 *           "updatedAt": "2021-06-01T07:35:27.359Z",
 *           "__v": 0,
 *           "commentsNum": 6
 *       }
 *   ]
 * }
 * @apiErrorExample {json} Error-Response:
     HTTP/1.1 400 Bad Request
     {
         "message" : "Tag Name is Required"
     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *       "message": "Tag Not Found"
 *
 *     }
 */
