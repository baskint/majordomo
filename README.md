# MajorDomo!!
Alexa Computer Vision Face Detection Door Bell Thingy

## Camera
Camera is attached to a RasPi with a motoion detector.

Things to do!

- [ ] When motion is detected we take a picture and send it to the middle tier.
- [ ] It would be great if we could only send a picture if we have identified that there is a face in the image.

## The Middle
The Middle is the api layer, it is responsible for:
Things to do!

- [ ] Receiving events from the camera
- [ ] Sending events to Alexa
- [ ] Maintaining the event log. This includes a log of:
	- [ ] When there was someone at the door.
	- [ ] Who was at the door.
	- [ ] When the last time each person was at the door.
- [ ] Connecting to or running a system for facial recognition. This will likely be an external service. Google, Amazon and Algorithmia all have API's for facial recognition.

## Alexa
When an Alexa skill is triggered then look at the last identified face ( or event depending on the question ) and announce who it was. Depending on the question asked there should be additional information Alexa could announce, such as if there is anyone at the door or not.

- [ ] Look into Alexa Skills and Intents.
- [ ] Alexa is based on lambda functions.
