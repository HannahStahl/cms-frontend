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
    BUCKET: "cms-backend-prod-attachmentsbucket-gskfdn3cqx2t"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://me3t2amdo0.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_TxFV8deDA",
    APP_CLIENT_ID: "4akk0238pvoiu6l0cqeb73cfvt",
    IDENTITY_POOL_ID: "us-east-1:b3bf1039-a69d-40d7-a239-a59c53040e4e"
  },
  cloudFront: {
    URL: "https://d284k0k8nv2x8f.cloudfront.net/"
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
