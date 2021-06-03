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
 *                  "name": "nature",
 *                  "photo": {
 *                      "description": "Used to test edit photo endpoint",
 *                      "tags": [
 *                          "60b646b5713aa239148be8a2",
 *                          "60b646b5713aa239148be8a3",
 *                          "60b646b6713aa239148be8a4",
 *                          "60b647455b90103070078df3",
 *                          "60b647755b90103070078df4",
 *                          "60b6483c9cd1194ad4d3e2fa",
 *                          "60b6483c9cd1194ad4d3e2fb",
 *                          "60b7a87073306f7fa83e53d6",
 *                          "60b7ddf70b24f13da065deee"
 *                      ],
 *                      "comments": [],
 *                      "views": 4,
 *                      "favouriteCount": 0,
 *                      "isPublic": true,
 *                      "license": "None",
 *                      "safety": "Safe",
 *                      "contentType": "Photo",
 *                      "allowCommenting": true,
 *                      "albums": [],
 *                      "_id": "60b63494d9e8252f94fbc9aa",
 *                      "title": "Edit Photo test v4",
 *                      "url": "http://localhost:3000/public/images/60b5f47c2b026f150822c5fd/60b63494d9e8252f94fbc9a9.png",
 *                      "creator": "60b5f47c2b026f150822c5fd",
 *                      "createdAt": "2021-06-01T13:22:28.872Z",
 *                      "updatedAt": "2021-06-02T19:37:27.683Z",
 *                      "__v": 0,
 *                      "commentsNum": 0
 *                  }
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
 *      {
            "description": "Used to test edit photo endpoint",
            "tags": [
                {
                    "count": 7,
                    "_id": "60b7ddf70b24f13da065deee",
                    "name": "one",
                    "createdAt": "2021-06-02T19:37:27.474Z",
                    "updatedAt": "2021-06-03T20:08:54.661Z",
                    "__v": 0
                }
            ],
            "comments": [],
            "views": 4,
            "favouriteCount": 0,
            "isPublic": true,
            "license": "None",
            "safety": "Safe",
            "contentType": "Photo",
            "allowCommenting": true,
            "albums": [],
            "_id": "60b63494d9e8252f94fbc9aa",
            "title": "Edit Photo test v4",
            "url": "http://localhost:3000/public/images/60b5f47c2b026f150822c5fd/60b63494d9e8252f94fbc9a9.png",
            "creator": {
                "showCase": {
                    "title": "Showcase",
                    "photos": []
                },
                "description": "",
                "occupation": "",
                "homeTown": "",
                "currentCity": "",
                "coverPhotoUrl": "http://localhost:3000/public/images/default/8.jpeg",
                "profilePhotoUrl": "http://localhost:3000/public/images/default/8.jpeg",
                "_id": "60b5f47c2b026f150822c5fd",
                "email": "test@test.com",
                "firstName": "Abdelrahman",
                "lastName": "Shahda",
                "userName": "test",
                "age": 22,
                "createdAt": "2021-06-01T08:49:00.059Z",
                "updatedAt": "2021-06-03T20:05:35.004Z",
                "__v": 15,
                "id": "60b5f47c2b026f150822c5fd",
                "numberOfFollowers": 0,
                "numberOfFollowings": 1,
                "isFollowing": false
            },
            "createdAt": "2021-06-01T13:22:28.872Z",
            "updatedAt": "2021-06-02T19:37:27.683Z",
            "__v": 0,
            "commentsNum": 0,
            "isFavourite": false
        }
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
