# Serverless suscribe form

This repo contains the handler for suscriptions in [gyarados.red](gyarados.red), the music project for [Migala](migala.mx).


## Dependencies

This function requires a Client side HTML form that send an email field with `enctype` = `text/plain`.

The project is built over

* [Node.js@12.10.0](https://nodejs.org/es/)
* and [Serverless@1.52.1](https://serverless.com/)

In production stage it uses the

* [Amazon SDK npm package](https://aws.amazon.com/es/sdk-for-node-js/)

For local testing, it uses:

* [Dynamo DB Local](https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
* Serverless offline npm package
* and the env-cmd npm package

## Usage

### Local installation

In your terminal, clone this repo and change to the main folder. Then, install the dependencies:

```
npm install
```

### Local deployment

Start your Dynamo DB Local table and run in your terminal:

```
npm start
```

This will return an endpoint where you can test:

```
localhost:3000/suscription/create
```

Send a text/plain request to this endpoint to create a new suscription:

```
curl -X POST \
  http://localhost:3000/suscription/create \
  -H 'Accept: */*' \
  -H 'Content-Type: text/plain' \
  -H 'Host: localhost:3000' \
  -H 'cache-control: no-cache' \
  -d email=mail@migala.mx
```


### Dynamo DB Local setting

#### 1. Start Database

Download the Dynamo Local DB files from [this webpage](https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and unzip them in your user's folder.

Run in your terminal

```
npm run-script dynamodb:start
```

This will start the dynamo db server and output this


```
java -Djava.library.path=~/dynamodb_local/DynamoDBLocal_lib -jar ~/dynamodb_local/DynamoDBLocal.jar -sharedDb


Initializing DynamoDB Local with the following configuration:
Port:   8000
InMemory:       false
DbPath: null
SharedDb:       true
shouldDelayTransientStatuses:   false
CorsParams:     *
```


Your Dynamo Local DB will be running on `localhost:8000`.

#### 2. Create table

Set your AWS credentials in your terminal with  

```
serverless config credentials --provider aws --key YourAWSKey --secret YourAWSSecret
```

Please refer this links for further information:

* [Creating an AWS account](https://aws.amazon.com/es/premiumsupport/knowledge-center/create-and-activate-aws-account/)
* [Serverless credentials configuration](https://serverless.com/framework/docs/providers/aws/guide/credentials/)


Fill the `config/env.local` file with the Dynamo table name and endpoint for local usage:

```
DYNAMODB_TABLE=table_name
DYNAMODB_ENDPOINT=http://localhost:8000
AMAZON_REGION=us-east-1

```

And then run in your terminal

```
npm run-script dynamodb:create
```

You will see in the output a confirmation message and the table description.

** Be aware to not being using the production environment! **

#### 3) Delete table

** Be super aware to not being using the production environment! **

When done testing, in your terminal run

```
npm run-script dynamodb:delete
```

You will see in the prompt the deletion confirm message and the table description.

## Deployment

Create and fill an `config/env.prod` file according to the `env.example` file, with your production environment.

Run in your terminal

```
npm run-script deploy:prod
```

## Contact
Please send and email to [david@migala.mx](david@migala.mx)
