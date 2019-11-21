'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const AUDIENCE_BROKER = 'Broker';
const AUDIENCE_UNDERWRITER = 'Underwriter';

const { UNDERWRITER_TOPIC_ARN, BROKER_TOPIC_ARN } = process.env;

exports.handler = async function (event, context) {
    console.log("event=" + event);
    let message;
    switch(event.messageType) {
        case "mortgageNotFoundMessage":
            message = mortgageNotFoundMessage(event.mortgageId);
            break;
        case "autoAssessmentMessage":
            message = autoAssessmentMessage(event.mortgage);
            break;
        case "autoApprovalMessage":
            message = autoApprovalMessage(event.mortgage);
            break;
        case "autoRejectionMessage":
            message = autoRejectionMessage(event.mortgage);
            break;
        case "underwriterApprovalMessage":
            message = underwriterApprovalMessage(event.mortgage);
            break;
        case "underwriterRejectionMessage":
            message = underwriterRejectionMessage(event.mortgage);
            break;
        default:
            message = {statusCode:500};
            break;
    }
    console.log(message);
    return message;
};

function mortgageNotFoundMessage(mortgageId) {

    return {
        Audience: AUDIENCE_BROKER,
        snsParam: {
            Subject: `Mortgage [${mortgageId}] Error.`,
            Message: `The Mortgage [${mortgageId}] cannot be found on the system. The Approval process will exit.`,
            TopicArn: BROKER_TOPIC_ARN
        }
    };
}

function autoAssessmentMessage(mortgage) {

    return {
        Audience: AUDIENCE_BROKER,
        snsParam: {
            Subject: `Mortgage [${mortgage.mortgageId}] Auto Assessment.`,
            Message: `The Mortgage [${mortgage.mortgageId}] is currently undergoing Auto Assessment.`,
            TopicArn: BROKER_TOPIC_ARN
        }
    };
}

function autoApprovalMessage(mortgage) {

    return {
        Audience: AUDIENCE_BROKER,
        snsParam: {
            Subject: `Mortgage [${mortgage.mortgageId}] Auto Assessment - Passed.`,
            Message: `The Mortgage [${mortgage.mortgageId}] has been Approved by the Auto Assessment process.`,
            TopicArn: BROKER_TOPIC_ARN
        }
    };
}

function autoRejectionMessage(mortgage) {

    return {
        Audience: AUDIENCE_BROKER,
        snsParam: {
            Subject: `Mortgage [${mortgage.mortgageId}] Auto Assessment - Referred.`,
            Message: `The Mortgage [${mortgage.mortgageId}] has been referred to an Underwriter for further review.`,
            TopicArn: BROKER_TOPIC_ARN
        }
    };
}

function underwriterApprovalMessage(mortgage) {

    return {
        Audience: AUDIENCE_BROKER,
        snsParam: {
            Subject: `Mortgage [${mortgage.mortgageId}] Approval.`,
            Message: `The Mortgage [${mortgage.mortgageId}] has been approved by the Underwriter.`,
            TopicArn: BROKER_TOPIC_ARN
        }
    };
}

function underwriterRejectionMessage(mortgage) {

    return {
        Audience: AUDIENCE_BROKER,
        snsParam: {
            Subject: `Mortgage [${mortgage.mortgageId}] Rejection.`,
            Message: `The Mortgage [${mortgage.mortgageId}] has been rejected by the Underwriter.`,
            TopicArn: BROKER_TOPIC_ARN
        }
    };
}