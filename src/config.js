const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "cms-backend-dev-attachmentsbucket-mg9wvqe6tx0h"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://8erdut5qvk.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_7uoELZHSx",
    APP_CLIENT_ID: "101giu3h5st2t1ajh7uav7riig",
    IDENTITY_POOL_ID: "us-east-1:0d829204-451b-46c8-9551-484eef562ec1"
  },
  cloudFront: {
    URL: "https://d1nwz5yvxuozj1.cloudfront.net/"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "cms-backend-prod-attachmentsbucket-1kgllxxybytns"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://oxy3euke2k.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_vS8aZkWdr",
    APP_CLIENT_ID: "1342s9d98biafb64f23u51djbk",
    IDENTITY_POOL_ID: "us-east-1:732a891f-52ce-49a0-99fa-45eeab936b27"
  },
  cloudFront: {
    URL: "https://d81qfb1ehnc7e.cloudfront.net/"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  ...config
};
