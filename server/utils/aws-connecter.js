const Quicksight = require('aws-sdk/clients/quicksight');
const config =  require('../../config/aws')
const AWS = require('aws-sdk');
let quickSight;
const getQuicksightClientConnection = () => {
    if (!quickSight) {
        try {
            AWS.config.credentials = new AWS.CognitoIdentityCredentials(config.aws.quicksight.credentials);
            AWS.config.region = config.aws.quicksight.iamRegion;
            quickSight = new Quicksight(
                {
                    region: config.aws.quicksight.region,
                }
            );
        } catch (err) {
            console.log(err)
        }

    }
    return quickSight;
}

const getDashboard = () => {
    return new Promise(((resolve, reject) => {
            const dashboard = {...config.aws.quicksight.dashboard};
            getQuicksightClientConnection()
                .getDashboardEmbedUrl(dashboard, (err, data) => {
                    if (err) {
                        console.log(err)
                        return reject(err);
                    }
                    return resolve(data ? data : '');
                });
        }
    ));
}

module.exports = {
    getDashboard
};