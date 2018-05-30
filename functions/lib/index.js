"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const firebaseAdmin = require("firebase-admin");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.defaultHeaders = {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type'
};
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.status(200)
        .set(exports.defaultHeaders)
        .send("Hello from Firebase with Cloud Functions! :-)");
});
exports.webhooks = functions.https.onRequest((request, response) => {
    switch (request.method) {
        case 'GET':
            const queryString = request.query.challenge;
            const responseHeaders = {
                'Content-Type': 'text/plain',
                'X-Content-Type-Options': 'nosniff'
            };
            response.status(200)
                .set(responseHeaders)
                .send(queryString);
            break;
        case 'POST':
            firebaseAdmin.initializeApp(functions.config().firebase);
            const db = firebaseAdmin.firestore();
            db.collection('dbxwebhooks').doc('resdata').set({
                data: request.body,
                timestamp: Date.now()
            })
                .then(() => {
                response.status(200)
                    .set(exports.defaultHeaders)
                    .send('Process successfully');
            })
                .catch((error) => {
                response.status(400)
                    .set(exports.defaultHeaders)
                    .send(error);
            });
            break;
        default:
            response.status(400)
                .set(exports.defaultHeaders)
                .send('Bad Request');
            break;
    }
});
exports.webhooksfb = functions.https.onRequest((request, response) => {
    switch (request.method) {
        case 'GET':
            const queryString = request.query.challenge;
            const responseHeaders = {
                'Content-Type': 'text/plain',
                'X-Content-Type-Options': 'nosniff'
            };
            response.status(200)
                .set(responseHeaders)
                .send(queryString);
            break;
        case 'POST':
            firebaseAdmin.initializeApp(functions.config().firebase);
            firebaseAdmin.database().ref('dbxwebhooks/').set({
                data: request.body,
                timestamp: Date.now()
            }, (error) => {
                if (error) {
                    response.status(400)
                        .set(exports.defaultHeaders)
                        .send(error);
                }
                else {
                    response.status(200)
                        .set(exports.defaultHeaders)
                        .send('Process successfully');
                }
            });
            break;
        default:
            response.status(400)
                .set(exports.defaultHeaders)
                .send('Bad Request');
            break;
    }
});
//# sourceMappingURL=index.js.map