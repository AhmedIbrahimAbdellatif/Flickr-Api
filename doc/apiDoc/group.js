/**
 * Group Endpoints
 */
/**
 * @apiDefine Authentication
 * @apiHeader {String} Authorization Users access-token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer asdasdkasdliuaslidas"
 *     }
 */
///////////////////GHALLAB////////////////////////
/**
 * @apiUse Authentication
 * @api {get} /groups/:groupName/members  View Group's members
 * @apiName View Group's members
 * @apiGroup Group
 * @apiDescription Returns all the members of a certain group
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} groupId  The ID of the group that you want to view it's members
 *
 * @apiSuccess (200)
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "groupId": "5349b4ddd2781d08c09890f4"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     members : [
 *              {
 *                userType : String
 *                firstName : String
 *                lastName : String
 *              },
 *              {
 *                userType : String
 *                firstName : String
 *                lastName : String
 *              }
 *               ]
 * }
 * @apiError (404) This group is not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "Group Not Found"
 *     }
 */
/**
 *
 * @api {get} /groups/:groupName/media  Get the group Media
 * @apiName Get Group's media
 * @apiGroup Group
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} groupId  The ID of the group that you want to view it's members
 *
 * @apiSuccess (200)
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "groupId": "5349b4ddd2781d08c09890f4"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     images : [
 *              {
 *                url : String
 *                title : String
 *                creator : String
 *                favouritesNum : Number
 *                commentsNum : Number
 *              },
 *              {
 *                url : String
 *                title : String
 *                creator : String
 *                favouritesNum : Number
 *                commentsNum : Number
 *              }
 *               ]
 * }
 * @apiError (404) This group is not found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "message" : "Group Not Found"
 *     }
 */

///////////////////////////////////////SHAHDA///////////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /group/join Join Group
 * @apiName Join Group
 * @apiGroup Group
 * @apiVersion 1.0.0
 * @apiDescription Join A group
 * @apiParam {String} userId userId that wants to join the group
 * @apiParam {String} groupId Group to which user will be added
 * @apiParamExample {json} Request-Example:
 * {
 *     "userId": "5349b4ddd2781d08c09890f4",
 *     "groupId": "5349b4ddd2781d08c09890f4"
 * }
 * @apiError (404) UserNotFound  The User isn't found
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
 * @api {post} /group/inviteUser Invite User to Group
 * @apiName Invite User to Group
 * @apiGroup Group
 * @apiVersion 1.0.0
 * @apiDescription Invite user to join a group
 * @apiParam {String} userId userId to invite
 * @apiParam {String} groupId Group to which user will be invited to
 * @apiParamExample {json} Request-Example:
 * {
 *     "userId": "5349b4ddd2781d08c09890f4",
 *     "groupId": "5349b4ddd2781d08c09890f4"
 * }
 * @apiError (404) UserNotFound  The User isn't found
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
 * @api {post} /group/invitePhoto Invite Photo to Group
 * @apiName Invite Photo to Group
 * @apiGroup Group
 * @apiVersion 1.0.0
 * @apiDescription Invite Photo to join a group
 * @apiParam {String} photoId PhotoId to invite
 * @apiParam {String} groupId Group to which Photo will be invited to
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
 * @api {post} /group/editUserAccess Promote/Demote Member
 * @apiName Promote Member
 * @apiGroup Group
 * @apiVersion 1.0.0
 * @apiDescription Promote Member to moderator or admin
 * @apiParam {String} userId Member to be promoted
 * @apiParam {String} groupId Group in which the member will be promoted
 * @apiParam {String} newRole New Role Of the Member
 * @apiParamExample {json} Request-Example:
 * {
 *     "userId": "5349b4ddd2781d08c09890f4",
 *     "groupId": "5349b4ddd2781d08c09890f4",
 *     "newRole": "admin"
 * }
 * @apiError (404) UserNotFound  The User isn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *          "message": "User Not Found"
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

/////////////////////////////HIMA//////////////////////////
/**
 * @apiUse Authentication
 * @api {post} /group/createGroup Create new group
 * @apiName Create New Group
 * @apiGroup Group
 * @apiVersion 1.0.0
 * @apiDescription Creating a new group by an authenticated user
 * @apiParam {String} userId User id to be saved as the creator's id
 * @apiParam {String} groupName Name for the group to be created
 * @apiParam {String} [description] Description for the group to be created
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userId": "5349b4ddd2781d08c09890f4",
 *       "groupName": "Paris"
 *       "description": "Paris pics 2019"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {}
 */
/**
 * @api {post} /group/search Search on Groups
 * @apiName Search on Groups
 * @apiGroup Group
 * @apiVersion 1.0.0
 * @apiDescription Searching for a certain group
 * @apiParam {String} [name] Search by name
 * @apiParam {String} [description] Search by description
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "paris",
 *     }
 * @apiParamExample {json} Request-Example:
 *     {
 *       "description": "Paris pics 2019"
 *     }
 * @apiSuccess {Object[]} groups An array of objects containing groups data
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "group": [
 *        "groupId": "5349b4ddd2781d08c09890f4",
 *        "description": "Paris pics 2019",
 *        "creator": "8949b4ddd2781d08c0989673",
 *        "admins": ["6549b4ddd2781d08c0989323","2349b4ddd2781d08c0989101"]
 *        "moderators": ["4649b4ddd2781d08c0989321","7049b4ddd2781d08c0989104"]
 *        "members": ["2879b4ddd2781d08c0989020","9049b4ddd2781d08c0989100"]
 *      ]
 *    }
 */
