const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { variable } = require("../../config/variables");

const s3Client = new S3Client({
  region: variable.s3Configs.awsRegion,
  credentials: {
    accessKeyId: variable.s3Configs.awsAccessKey,
    secretAccessKey: variable.s3Configs.awsSecretKey,
  },
});

const uploadFile = async (buffer, name, mimeType) => {
  const params = {
    Bucket: variable.s3Configs.s3BucketName,
    Key: name,
    Body: buffer,
    ContentType: mimeType,
    ACL: "public-read",
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
};
module.exports = {
  uploadFile,
};
