const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "niccatterall-backend-dev-attachmentsbucket-1v73kzl4bbwhv"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://cp8jlqm7d3.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_i23UDYdki",
    APP_CLIENT_ID: "7464ebesru7v7iut8va04g8vb4",
    IDENTITY_POOL_ID: "us-east-1:5ee7ccf9-e8b0-466f-9065-7635bbe9c49d"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "niccatterall-backend-prod-attachmentsbucket-1fvxjomvxu1f3"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ba5ikikx2f.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_luCGbgKx8",
    APP_CLIENT_ID: "13rhhmdcbjdne76974oj9bm93k",
    IDENTITY_POOL_ID: "us-east-1:bc98ab36-d15c-4ced-97f6-939c764c1bf5"
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
