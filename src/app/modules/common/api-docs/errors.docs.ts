/**
 * @apiDefine IdentityValidationError
 * @apiError IdentityValidation Invalid uuid in a URL parameter.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 400 Bad Request
 *     {
 *       "statusCode": 400,
 *       "appCode": "BAD_REQUEST"
 *       "message": "invalid uuid in url param"
 *     }
 */

/**
 * @apiDefine RequestBodyValidationError
 * @apiError RequestBodyValidation Invalid request body format.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 400 Bad Request
 *     {
 *       "statusCode": 400,
 *       "appCode": "BAD_REQUEST"
 *       "message": "{field} must be a {type}"
 *     }
 */

/**
 * @apiDefine MissingQueryError
 * @apiError MissingQuery Required query parameter not included.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 400 Bad Request
 *     {
 *       "statusCode": 400,
 *       "appCode": "BAD_REQUEST"
 *       "message": "Required query parameter not included"
 *     }
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError Unauthorized Incorrect JWT credentials.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 401 Unauthorized
 *     {
 *       "statusCode": 401,
 *       "appCode": "UNAUTHORIZED"
 *       "message": *see message list below
 *     }
 *
 *     Messages:
 *         "No auth token"
 *         "invalid token"
 *         "invalid signature"
 *         "Unexpected token {char} in JSON at position {x}"
 *         "invalid token payload"
 *         "invalid u_id on token payload"
 */

/**
 * @apiDefine UserNotFoundError
 * @apiError UserNotFound No user found with that identity.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "statusCode": 404,
 *       "appCode": "NOT_FOUND"
 *       "message": "Item not found"
 *     }
 */

/**
 * @apiDefine SQLError
 * @apiError SQLError Internal error with database.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 500 Internal Server Error
 *     {
 *       "statusCode": 500,
 *       "appCode": "INTERNAL_SERVER_ERROR"
 *       "message": "Internal server error with database"
 *     }
 */
