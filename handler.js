const url = require('url')
const AWS = require('aws-sdk')

AWS.config.update({
    endpoint: process.env.DYNAMODB_ENDPOINT
})

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.create = async (event) => {
  try {
    const now = new Date()
    const query = url.parse(`?${event.body}`, {parseQueryString: true}).query
    const { email } = query

    if (!email) {
      console.error('Cannot process request')
      console.error(JSON.parse(event.body))

      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'Bad request'
          },
          null,
          2
        ),
      }
    }

    const dynamoItem = {
      email: email,
      timestamp: now.toISOString()
    }

    const itemParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: dynamoItem,
      ConditionExpression: "attribute_not_exists(email)"
    }

    return await new Promise((resolve, reject) => {
      dynamoDb.put(itemParams, (err, data) => {
        if (err && err.code === 'ConditionalCheckFailedException') {
          console.warn(`Item already exists: ${JSON.stringify(itemParams.Item)}`)

          resolve({
            statusCode: 202,
            body: JSON.stringify(dynamoItem, null, 2)
          })
        }
        console.log(`New item created: ${JSON.stringify(itemParams.Item)}`)

        resolve({
          statusCode: 201,
          body: JSON.stringify(dynamoItem, null, 2)
        })
      })
    })
  } catch (err) {
    console.error(err)
    console.error(event.body)

    return {
      statusCode: 500
    }
  }
}
