'use strict'

// setup uncaught exception handling
try {
    const NodeEventHandler = require('@teamhive/node-event-handler').NodeEventHandler;

    NodeEventHandler.logUncaughtException();
    NodeEventHandler.logUnhandleRejection();
} catch (error) {
    console.error('ERROR SETTING UP EVENT HANDLER: ' + error);
    process.exit(1);
}

// start application
require('./dist/main');
