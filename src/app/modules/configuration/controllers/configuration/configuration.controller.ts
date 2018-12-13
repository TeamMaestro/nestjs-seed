import { Controller, Get } from '@nestjs/common';

@Controller('v1/versions')
export class ConfigurationController {
    /**
     * @api {get} /api/v1/versions Fetch Version Number
     * @apiVersion 0.0.1
     * @apiName FetchVersion
     * @apiGroup Configuration
     * @apiDescription Looks up the version from the package.json
     *
     * @apiSuccess (Response-Body) {String} version The Package.json version number
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       version: '0.0.1'
     *     }
     */
    @Get()
    version() {
        return {
            version: process.env.npm_package_version
        };
    }
}
