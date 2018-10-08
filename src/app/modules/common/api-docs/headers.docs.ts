/**
 * @apiDefine AuthHeader
 * @apiHeader (Request-Header) {String} Authorization Using Bearer token for cookieless requests
 * @apiHeaderExample {json} Header-Example:
 *      {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *      }
 */

/**
 * @apiDefine AuthContentHeader
 * @apiHeader (Request-Header) {String} Authorization Using Bearer token for cookieless requests
 * @apiHeader (Request-Header) {String} Content-Type Set Content-Type to application/json
 *
 * @apiHeaderExample {json} Header-Example:
 *      {
 *          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...",
 *          "Content-Type": "application/json"
 *      }
 */
