const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "cms-backend-dev-attachmentsbucket-17ju3iru7wi95"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://o9n2e948d3.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_SbDKmXsti",
    APP_CLIENT_ID: "1qqhabjcfgphf867elo1h92328",
    IDENTITY_POOL_ID: "us-east-1:cfce8ddf-89c8-457d-8fab-55308321929a"
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
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
