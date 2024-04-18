'use strict';

const configuration = require('./configuration');

exports.handler = async (event, context, callback) => {
    const config = event.Records[0].cf.config;

    switch (config.eventType) {
        case "viewer-request":
            await handleBasicAuth(event, context, callback);
            break;

        case "origin-request":
            await handleDefaultDirectoryIndex(event, context, callback);
            break;
    }
};

const handleBasicAuth = async (event, context, callback) => {
    const config = await configuration.getConfiguration();
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const basicAuthUsername = config.basicAuthUsername;
    const basicAuthPassword = config.basicAuthPassword;
    const basicAuthentication = new Buffer(basicAuthUsername + ":" + basicAuthPassword).toString("base64");
    const basicAuthenticationHeader = 'Basic ' + basicAuthentication;

    console.log("Basic Auth", basicAuthUsername, basicAuthPassword);

    if (typeof headers.authorization == 'undefined' || headers.authorization[0].value !== basicAuthenticationHeader) {
        const body = 'You are not authorized to enter';
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: body,
            headers: {
                'www-authenticate': [{key: 'WWW-Authenticate', value: 'Basic'}]
            },
        };
        callback(null, response);
    }
    callback(null, request);
}

const handleDefaultDirectoryIndex = async (event, context, callback) => {
    // Extract the request from the CloudFront event that is sent to Lambda@Edge
    var request = event.Records[0].cf.request;

    // Extract the URI from the request
    var olduri = request.uri;

    // Match any '/' that occurs at the end of a URI. Replace it with a default index
    var newuri = olduri.replace(/^\/[a-zA-z0-9-\/]*$/, '\/index.html');

    // Log the URI as received by CloudFront and the new URI to be used to fetch from origin
    console.log("Old URI: " + olduri);
    console.log("New URI: " + newuri);

    // Replace the received URI with the URI that includes the index page
    request.uri = newuri;

    // Return to CloudFront
    return callback(null, request);
}
