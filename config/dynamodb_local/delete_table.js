const AWS = require("aws-sdk")

AWS.config.update({
  endpoint: process.env.DYNAMODB_ENDPOINT,
  region: process.env.AMAZON_REGION
})

const dynamodb = new AWS.DynamoDB()
const params = {
    TableName : process.env.DYNAMODB_TABLE
}

dynamodb.deleteTable(params, (err, data) => {
  if (err) {
      console.error("Unable to delete table. Error:", JSON.stringify(err, null, '\t'))
  } else {
      console.log("Table deleted:", JSON.stringify(data, null, '\t'))
  }
})
