# MajorDomo!!
Alexa Computer Vision Face Detection Door Bell Thingy

## Camera
Camera is attached to a RasPi with a motoion detector.
1. When motion is detected we take a picture and send it to the 	    middle tier.
2. It would be great if we could only send a picture if we have        identified that there is a face in the image.
## The Middle
The Middle is the api layer, it is responsible for:
1. Receiving events from the camera
2. Sending events to Alexa
3. Maintaining the event log. This includes a log of:
	1. When there was someone at the door.
	2. Who was at the door.
	3. When the last time each person was at the door.
4. Connecting to or running a system for facial recognition. This will likely be an external service. Google, Amazon and Algorithmia all have API's for facial recognition.

## Alexa
When an Alexa skill is triggered then look at the last identified face ( or event depending on the question ) and announce who it was.
Depending on the question asked there should be additional information Alexa could announce, such as if there is anyone at the door or not.
1. Look into Alexa Skills and Intents.
2. Alexa is based on lambda functions.
