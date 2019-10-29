const AWS = require("aws-sdk")
console.log('configuring amazon')
console.log(JSON.stringify({
  endpoint: process.env.DYNAMODB_ENDPOINT,
  region: process.env.AMAZON_REGION
}))
AWS.config.update({
  region: process.env.AMAZON_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT
})

const dynamodb = new AWS.DynamoDB()
const params = {
    TableName : process.env.DYNAMODB_TABLE,
    KeySchema: [
        { AttributeName: "email", KeyType: "HASH"}
      ],
    AttributeDefinitions: [
        { AttributeName: "email", AttributeType: "S" },
      ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
}

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error:", JSON.stringify(err, null, '\t'))
    } else {
        console.log("Created table. Table description:", JSON.stringify(data, null, '\t'))
    }
})
