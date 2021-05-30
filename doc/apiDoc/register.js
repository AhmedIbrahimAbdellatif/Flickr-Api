/**
 * @apiDefine Authentication
 * @apiHeader {String} Authorization Users access-token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer asdasdkasdliuaslidas"
 *     }
 * @apiError (401) InvalidToken Token May be Expired or Invalid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 unauthorized
 *     {
 *
 *       "message": "Token may be Invalid or Expired! Please log in to continue"
 *
 *     }
 * @apiError (401) UserDeleted The user linked to this token does no longer exist
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 unauthorized
 *     {
 *
 *       "message": "The user that belongs to this token does not exist"
 *
 *     }
 * @apiError (401) UserChangedPassword The user Linked to this token changed his password recently therefore token is no longer valid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 unauthorized
 *     {
 *
 *       "message": "The user that belongs to this token changed his password recently! Please reLogin"
 *
 *     }
 * @apiError (401) unauthorized User is not authorized
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 unauthorized
 *     {
 *
 *       "message": "You are not logged in! Please log in to continue"
 *
 *     }
 */
/**
 *
 * @api {post} /register/loginWithFacebook Login using Facebook
 * @apiName Facebook Login
 * @apiGroup Register
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} loginType  a string containing type of login ex:"Facebook"
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     "loginType" : "Facebook"
 *     "accessToken": "askdjaksdjaidjskdjak13412jkasjdk.asdasdasd"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accessToken": "skdnksd7474g3kdbjfhf34",
 *       "user": {
 *           "_id": "5349b4ddd2781d08c09890f4",
 *          "email": "test@email.com",
 *          "firstName": "User",
 *          "lastName": "User",
 *          "userName": "test",
 *          "age": 18,
 *          "showCase": {
 *              "photos": [],
 *              "title": "showCase"   
 *          },
 *          "numberOfFollowings": 9,
 *          "numberOfFollowers": 0,
 *          "description": "",
 *          "occupation": "",
 *          "homeTown": "",
 *          "currentCity": "",
 *        }
 *     }
 * @apiError (400) Bad Request  AccessToken Is Required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *        "message": "AccessToken Is Required"
 *
 *     }
 *
 */
/**
 *
 * @api {post} /register/signUpWithFacebook Sign Up using Facebook
 * @apiName Facebook SignUp
 * @apiGroup Register
 * @apiVersion  1.0.0
 *
 *
 * @apiParam  {String} loginType  a string containing type of login ex:"Facebook"
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     "loginType" : "Facebook"
 *     "accessToken": "askdjaksdjaidjskdjak13412jkasjdk.asdasdasd"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accessToken": "skdnksd7474g3kdbjfhf34",
 *       "user": {
 *           "_id": "5349b4ddd2781d08c09890f4",
 *          "email": "test@email.com",
 *          "firstName": "User",
 *          "lastName": "User",
 *          "userName": "test",
 *          "age": 18,
 *          "showCase": {
 *              "photos": [],
 *              "title": "showCase"   
 *          },
 *          "numberOfFollowings": 9,
 *          "numberOfFollowers": 0,
 *          "description": "",
 *          "occupation": "",
 *          "homeTown": "",
 *          "currentCity": "",
 *        }
 *     }
 * @apiError (400) AccessTokenMissing  AccessToken Is Required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "AccessToken Is Required"
 *
 *     }
 *
 *
 */

/**
 * @api {post} /register/logIn Login a User
 * @apiName Login User
 * @apiGroup Register
 * @apiVersion 1.0.0
 * @apiDescription Login into a user account
 * @apiParam {String} email User's email credential
 * @apiParam {String} password Password credential (minimum 8 characters)
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "AhmedIbrahim@test.com",
 *       "password": "12345678"
 *     }
 * @apiSuccess {String} accessToken Returning the access-token to the user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accessToken": "skdnksd7474g3kdbjfhf34",
 *       "user": {
 *           "_id": "5349b4ddd2781d08c09890f4",
 *          "email": "test@email.com",
 *          "firstName": "User",
 *          "lastName": "User",
 *          "userName": "test",
 *          "age": 18,
 *          "showCase": {
 *              "photos": [],
 *              "title": "showCase"   
 *          },
 *          "numberOfFollowings": 9,
 *          "numberOfFollowers": 0,
 *          "description": "",
 *          "occupation": "",
 *          "homeTown": "",
 *          "currentCity": "",
 *        }
 *     }
 * @apiError (401) Unauthorized   Wrong user credentials
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *          "message": "Invalid Credentials"
 *
 *     }
 * @apiError (400) EmailMissing Email is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "Email is required"
 *
 *     }
 * @apiError (400) PasswordMissing Password is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "Password is required"
 *
 *     }
 *
 */

/**
 * @api {post} /register/logOut LogOut a User
 * @apiUse Authentication
 * @apiName Log Out User
 * @apiGroup Register
 * @apiVersion 1.0.0
 * @apiDescription Log Out a user account
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          message: 'You are logged out successfuly'
 *     }
 */

/**
 *  @api {post} /register/signUp Sign Up
  * @apiName Sign Up
  * @apiGroup Register
  * @apiVersion 1.0.0
  * @apiDescription Creating a new account.
  * @apiParam {String} email User's Email
  * @apiParam {String} password User's Password
  * @apiParam {String} firstName User's First Name
  * @apiParam {String} lastName User's Last Name
  * @apiParam {Number} age User's Age
  * @apiParamExample {json} Request-Example:
  *     {    
  *       "email": "user@email.com",
  *       "password": "12345678",
  *       "firstName": "User",
  *       "lastName": "User",
  *       "age": 18,      
  *     }
 * @apiSuccess {Object} user
 * @apiSuccess {String} user.email User's Email
 * @apiSuccess {String} user.firstName User's First Name
 * @apiSuccess {String} user.lastName User's Last Name
 * @apiSuccess {String} user.accessToken  User's Access Token
 * @apiSuccess {Number} user.age User's Age
 * @apiSuccess {String} user._id User's Id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accessToken": "skdnksd7474g3kdbjfhf34",
 *       "user": {
 *           "_id": "5349b4ddd2781d08c09890f4",
 *          "email": "test@email.com",
 *          "firstName": "User",
 *          "lastName": "User",
 *          "userName": "test",
 *          "age": 18,
 *          "showCase": {
 *              "photos": [],
 *              "title": "showCase"   
 *          },
 *          "numberOfFollowings": 9,
 *          "numberOfFollowers": 0,
 *          "description": "",
 *          "occupation": "",
 *          "homeTown": "",
 *          "currentCity": "",
 *        }
 *     }
 * @apiError (403) UserExists  The Email is already registered
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Failed
 *     {
 *       
 *         "message": "User Already Exists"
 *        
 *     }
 * @apiError (400) EmailMissing Email is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *     
 *          "message": "Email is required"
 *        
 *     }
 * @apiError (400) PasswordMissing Password is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *     
 *          "message": "Password is required"
 *        
 *     }
 
 * @apiError (400) firstNameMissing First Name is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *     
 *          "message": "First Name is required"
 *        
 *     }
 * @apiError (400) lastNameMissing Last Name is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *     
 *          "message": "Last Name is required"
 *        
 *     }
 
 * @apiError (400) AgeMissing Age  is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *     
 *          "message": "Age is required"
 *        
 *     }
 * @apiError (400) PasswordTooShort    Password must be more than 8 characters
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "Password must be more than 8 characters"
 *
 *     }
 */
/**
 * @apiUse Authentication
 * @api {post} /register/changePassword Change Password
 * @apiName Change User's Password
 * @apiGroup Register
 * @apiVersion 1.0.0
 * @apiDescription Change User's Password
 * @apiParam {String} newPass New Password
 * @apiParam {String} oldPass Old Password
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *     }
 * @apiParamExample {json} Request-Example:
 * {
 *     "newPass": "5349b4ddd2781d08c09890f4",
 *     "oldPass": "fifa2011"
 * }
 * @apiError (400) NewPasswordMissing New Password of the account is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "New Password is required"
 *
 *     }
 * @apiError (400) OldPasswordMissing Old Password of the account is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "Old Password is required"
 *
 *     }
 * @apiError (400) OldPasswordMismatch Old Password of the account is wrong
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "Old Password is wrong"
 *
 *     }
 * @apiError (400) NewPassWrongFormat New Password should be more than 8 character
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "New Password should be more than 8 characters"
 *
 *     }
 * @apiError (400) OldPassWrongFormat Old Password should be more than 8 character
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "Old Password should be more than 8 characters"
 *
 *     }
 */

/**
 * @api {post} /register/forgetPassword Forget Password
 * @apiName Forget Password
 * @apiGroup Register
 * @apiVersion 1.0.0
 * @apiDescription Send User Code to Reset password
 * @apiParam {String} email Email whose password was forgetten
 *  @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *     }
 * @apiParamExample {json} Request-Example:
 * {
 *     "email": "test@test.com"
 * }
 *
 * @apiError (404) UserNotFound  The id of the User wasn't found
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *
 *        "message": "User Not Found"
 *
 *     }
 * @apiError (400) EmailMissing Email is required
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *
 *          "message": "Email is required"
 *
 *     }
 */
