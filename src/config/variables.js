require('dotenv').config();
const mongoConnectUrl = process.env.MONGO_CONNECTION_STRING;
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET_KEY;

const s3Configs = {
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  awsEndPoint: process.env.AWS_ENDPOINT,
  s3BucketName: process.env.S3_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
};
exports.variable = {
  mongoConnectUrl,
  port,
  jwtSecret,
 s3Configs
};
