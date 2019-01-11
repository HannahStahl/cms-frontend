const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "cms-backend-dev-attachmentsbucket-qg2q7724hcy"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://heguftgbx3.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_AMUlYb0nI",
    APP_CLIENT_ID: "5nraug0l98dkdmva25ui1qvc7j",
    IDENTITY_POOL_ID: "us-east-1:91b45bfc-2b86-4db2-8da2-5ca11eda967a"
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
  ...config
};
