const AWS = require('aws-sdk');
const { transformInterest } = require('../tranformers/interest');

require('dotenv').config();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
})

const docClient = new AWS.DynamoDB.DocumentClient();

const defaultParams = {
    TableName: 'Interest',
    AttributesToGet: [
        'ID',
        'colors',
        'foods',
        'movies',
        'animals'
    ]
}

const getByParams = params => 
    new Promise((resolve, reject) => {
        docClient.get(params,(err, data) => {
            if (err) {
                console.log('error getting from dynamdb', err);
                reject(err);
            } else {
                const result = transformInterest(data.Item);
                console.log('got data from dynamodb');
                resolve(result);
            }
        })
    })

const getInterestById = async id => {
    const params = {
        ...defaultParams,
        Key: {
            ID: id,
        }
    }
    return getByParams(params);
}

module.exports = {
    getInterestById
}