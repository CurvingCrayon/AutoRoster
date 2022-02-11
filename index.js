const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
var http = require('http');
var https = require('https');
var express = require('express');
var app = express();

var httpServer = http.createServer(app);

// TODO: Rerun watch()
// https://developers.google.com/gmail/api/guides/push#protocol

app.post('/push', /*jsonBodyParser,*/ async (req, res) => {
    // Message comes in form in HTTP body:
    // https://developers.google.com/gmail/api/guides/push#protocol
    // {
    //     message:
    //     {
    //       // This is the actual notification data, as base64url-encoded JSON.
    //       data: "eyJlbWFpbEFkZHJlc3MiOiAidXNlckBleGFtcGxlLmNvbSIsICJoaXN0b3J5SWQiOiAiMTIzNDU2Nzg5MCJ9",
        
    //       // This is a Cloud Pub/Sub message id, unrelated to Gmail messages.
    //       "messageId": "2070443601311540",
        
    //       // This is the publish time of the message.
    //       "publishTime": "2021-02-26T19:13:55.749Z",
    //     }
        
    //     subscription: "projects/myproject/subscriptions/mysubscription"
    //   }
    // }
    var body = req.body;
    data = new Buffer(body.data, 'base64');
    data = data.toString('ascii');
    // data will be in JSON string form {"emailAddress": "user@example.com", "historyId": "9876543210"}
    data = JSON.parse(data);
    console.log(data);
    res.status(200).send();


    // Verify that the request originates from the application.
    // if (req.query.token !== process.env.PUBSUB_VERIFICATION_TOKEN) {
    //     res.status(400).send('Invalid request');
    //     return;
    // }

    // // Verify that the push request originates from Cloud Pub/Sub.
    // try {
    //     // Get the Cloud Pub/Sub-generated JWT in the "Authorization" header.
    //     const bearer = req.header('Authorization');
    //     const [, token] = bearer.match(/Bearer (.*)/);
    //     tokens.push(token);

    //     // Verify and decode the JWT.
    //     // Note: For high volume push requests, it would save some network
    //     // overhead if you verify the tokens offline by decoding them using
    //     // Google's Public Cert; caching already seen tokens works best when
    //     // a large volume of messages have prompted a single push server to
    //     // handle them, in which case they would all share the same token for
    //     // a limited time window.
    //     const ticket = await authClient.verifyIdToken({
    //     idToken: token,
    //     audience: 'example.com',
    //     });

    //     const claim = ticket.getPayload();

    //     // IMPORTANT: you should validate claim details not covered
    //     // by signature and audience verification above, including:
    //     //   - Ensure that `claim.email` is equal to the expected service
    //     //     account set up in the push subscription settings.
    //     //   - Ensure that `claim.email_verified` is set to true.

    //     claims.push(claim);
    // } catch (e) {
    //     res.status(400).send('Invalid token');
    //     return;
    // }

    // // The message is a unicode string encoded in base64.
    // const message = Buffer.from(req.body.message.data, 'base64').toString(
    //     'utf-8'
    // );

    // messages.push(message);

    // res.status(200).send();
});


httpServer.listen(8080);

// TODO: get historyId from watch (https://developers.google.com/gmail/api/reference/rest/v1/users/watch)
// Then use to do users.history
// Potentially more permissions on gmail token?