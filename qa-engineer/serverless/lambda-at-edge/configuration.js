const AWS = require('aws-sdk');

var configuration = null;

async function getConfiguration() {
    if (!configuration) {
        const ssm = new AWS.SSM({region: 'us-east-1'});
        const data = {};
        let nextToken = null;

        do {
            const results = await ssm.getParametersByPath({
                Path: `/interviewExercise/`,
                Recursive: true,
                MaxResults: 10,
                NextToken: nextToken,
                WithDecryption: true
            }).promise();

            for (const i in results.Parameters) {
                const matches = results.Parameters[i].Name.match(/^.*\/(\w+).*?$/);

                if (matches) {
                    data[matches[1]] = results.Parameters[i].Value;
                }
            }

            nextToken = results.NextToken;
        } while (nextToken);

        configuration = data;
    }

    return Promise.resolve(configuration);
}

module.exports = {
    getConfiguration
}