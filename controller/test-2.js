const accountSid = 'ACbd20effaa2e19d301c6aa624040ff397';
const authToken = '6d017276a1c14bf4cbde3d327691c51c';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

client.messages
    .create({
        body: 'Hii',
        from: 'whatsapp:+552120420682',
        to: 'whatsapp:+918093773107'
    })
    .then(message => console.log(message.sid))
    .done();