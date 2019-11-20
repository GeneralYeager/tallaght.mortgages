'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const AUDIENCE_BROKER = 'Broker';
const AUDIENCE_UNDERWRITER = 'Underwriter';

const { UNDERWRITER_TOPIC_ARN, BROKER_TOPIC_ARN } = process.env;

exports.notificationMessages = function(event, context, callback) {

    const mortgage = event.mortgage;
    switch(event.messageType) {
        case "mortgageNotFoundMessage":
            return mortgageNotFoundMessage(mortgage);
        case "autoAssessmentMessage":
            return autoAssessmentMessage(mortgage);
        case "autoApprovalMessage":
            return autoAssessmentMessage(mortgage);
        case "autoRejectionMessage":
            return autoRejectionMessage(mortgage);
        case "underwriterApprovalMessage":
            return underwriterApprovalMessage(mortgage);
        case "underwriterRejectionMessage":
            return underwriterRejectionMessage(mortgage);
        default:
            return {};
    }
}

function mortgageNotFoundMessage(mortgage) {

    return {
        Subject: `Mortgage [${mortgage.mortgageId}] Error.`,
        Message: `The Mortgage [${mortgage.mortgageId}] cannot be found on the system. The Approval process will exit.`,
        Audience: AUDIENCE_BROKER,
        TopicArn: BROKER_TOPIC_ARN
    };
}

function autoAssessmentMessage(mortgage) {

    return {
        Subject: `Mortgage [${mortgage.mortgageId}] Auto Assessment.`,
        Message: `The Mortgage [${mortgage.mortgageId}] is currently undergoing Auto Assessment.`,
        Audience: AUDIENCE_BROKER,
        TopicArn: BROKER_TOPIC_ARN
    };
}

function autoApprovalMessage(mortgage) {

    return {
        Subject: `Mortgage [${mortgage.mortgageId}] Auto Assessment - Passed.`,
        Message: `The Mortgage [${mortgage.mortgageId}] has been Approved by the Auto Assessment process.`,
        Audience: AUDIENCE_BROKER,
        TopicArn: BROKER_TOPIC_ARN
    };
}

function autoRejectionMessage(mortgage) {

    return {
        Subject: `Mortgage [${mortgage.mortgageId}] Auto Assessment - Referred.`,
        Message: `The Mortgage [${mortgage.mortgageId}] has been referred to an Underwriter for further review.`,
        Audience: AUDIENCE_BROKER,
        TopicArn: BROKER_TOPIC_ARN
    };
}

function underwriterApprovalMessage(mortgage) {

    return {
        Subject: `Mortgage [${mortgage.mortgageId}] Approval.`,
        Message: `The Mortgage [${mortgage.mortgageId}] has been approved by the Underwriter.`,
        Audience: AUDIENCE_BROKER,
        TopicArn: BROKER_TOPIC_ARN
    };
}

function underwriterRejectionMessage(mortgage) {

    return {
        Subject: `Mortgage [${mortgage.mortgageId}] Rejection.`,
        Message: `The Mortgage [${mortgage.mortgageId}] has been rejected by the Underwriter.`,
        Audience: AUDIENCE_BROKER,
        TopicArn: BROKER_TOPIC_ARN
    };
}