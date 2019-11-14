'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const WebSocket = require('ws');

const ws = new WebSocket(process.env.WEBSOCKET_API);

exports.handler = async (event, context) => {

    try {
        const message = {
            audience: 'Broker',
            text: "Mortgage is Approved"
        };

        ws.send(JSON.stringify(message));
    } catch (error) {
        return {
            statusCode: 400,
            error: `Could send the Websocket message: ${error.stack}`
        };
    }
};