const env = require('../../env');

const AWS = require('aws-sdk');

// Konfigurasi AWS DynamoDB dengan kredensial dari .env
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: env.aws.accessKeyId,
    secretAccessKey: env.aws.secretAccessKey,
    sessionToken: env.aws.sessionToken
});

const TABLE_NAME = "apiCache"; // Ambil nama tabel dari .env

module.exports = { TABLE_NAME, dynamoDB };
