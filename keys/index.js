"use strict";
var fs = require("fs");
var path = require("path");
var dir = path.resolve(__dirname);

exports.session = {
    private: fs.readFileSync(dir + '/session-private.key', 'utf8'),
    public: fs.readFileSync(dir + '/session-public.pem', 'utf8')
};
