/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Major Domo who is at the door"
 *  Alexa: "Major Domo detected: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var AWS = require('aws-sdk');
// AWS.config.region = 'us-west-2';
const https = require('https');


/**
 * Array containing people at door.
 */
var PEOPLE = [
    "Your neighbor Bob is waiting at the door",
    "UPS truck driver Todd has a package for you",
    "FedEx truck with a large package is at the door",
    "Your neighbor Jenna is at the door with a box of chocolates",
    "Your mail person has just delivered a box"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
    // handleOpenTheDoor(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "MajorDomoIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "PleaseOpenTheDoorIntent": function (intent, session, response) {
        handleOpenTheDoor(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me who is at the door?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }

};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleOpenTheDoor(response) {
    // Get a random space fact from the space people list
    var factIndex = Math.floor(Math.random() * PEOPLE.length);
    var randomFact = PEOPLE[factIndex];

    // Create speech output
    var speechOutput = "Major Domo detected: " + randomFact;
    var cardTitle = "The person is";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}


function handleNewFactRequest(response) {

    // var s3 = new AWS.S3();
    // var params = {Bucket: 'iothack2016', Key: "atthedoor.txt"};
    // var speechOutput;
    var options = {
        hostname: 's3-us-west-2.amazonaws.com',
        path: '/iothack2016/latest',
        method: 'GET',
        headers: {
            //'Accept': 'text/plain'
        }
    };

    console.log('entering');

    var req = https.request(options, function(res) {
        console.log('my string');
        //console.log(res.body);
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function (chunk) {
             body += chunk;
        });
        res.on('end', function () {
            console.log('ended');
            console.log(body);
            var speechOutput = body + " is at the door";
            var cardTitle = "The person is";
            response.tellWithCard(speechOutput, cardTitle, speechOutput);
        });


    });

    req.on('error', function(e) {
       console.error(e);
    });

    req.end();


    console.log('exiting');


}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};
