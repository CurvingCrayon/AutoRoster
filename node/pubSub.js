/**
 * TODO(developer): Uncomment this variable before running the sample.
 */
require('dotenv').config();


// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

export async function createTopic() {
  // Creates a new topic
  await pubSubClient.createTopic(topicName);
  console.log(`Topic ${topicName} created.`);
}

//createTopic(topicName);

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicName = 'YOUR_TOPIC_NAME';
// const subscriptionName = 'YOUR_SUBSCRIPTION_NAME';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

export async function createPushSubscription() {
  const options = {
    pushConfig: {
      // Set to an HTTPS endpoint of your choice. If necessary, register
      // (authorize) the domain on which the server is hosted.
      pushEndpoint: `http://autoroster.herokuapp.com/push`,
    },
  };

  await pubSubClient
    .topic(topicName)
    .createSubscription(subscriptionName, options);
  console.log(`Subscription ${subscriptionName} created.`);
}

createPushSubscription().catch(console.error);