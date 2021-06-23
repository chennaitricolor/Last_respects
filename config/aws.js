module.exports = {
    aws: {
        accessKey :  process.env.ACCESS_KEY,
        secretAccessKey : process.env.SECRETACCESSKEY,
        quicksight: {
            iamRegion: process.env.AWS_IAM_REGION,
            credentials: {
                AccountId: process.env.AWS_IAM_ACCOUNT_ID,
                RoleSessionName: process.env.AWS_IAM_ROLE_SESSION_NAME,
                RoleArn: process.env.AWS_IAM_ROLE_ARN,
                IdentityPoolId: process.env.AWS_IAM_POOL_ID,
            },
            region: process.env.AWS_QS_REGION,
            dashboard: {
                AwsAccountId: process.env.AWS_IAM_ACCOUNT_ID,
                DashboardId: process.env.AWS_QS_DASHBOARD_ID,
                IdentityType: 'IAM',
                ResetDisabled: true,
                SessionLifetimeInMinutes: 100,
                UndoRedoDisabled: false,
            },
        },
    }
}