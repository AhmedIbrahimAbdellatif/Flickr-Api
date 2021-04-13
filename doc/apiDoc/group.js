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