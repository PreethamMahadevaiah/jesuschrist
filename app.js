// Requiring global modules
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let sendMessage = require('./controller/test.js');
let respond = require('./controller/responsiveChat.js');

// Default page
app.post('/sendMessage', (req, res) => {
    sendMessage();
    res.send(`<h1>Sending message.</h1>`)
});

// To knnow status of elasticsearch domain.
app.post('/respond', async (req, res) => {
    // respond();
    const twiml = new MessagingResponse();
    if (req.body.Body.toLowerCase() === 'hello') {
        twiml.message('Hi!');
    } else if (req.body.Body.toLowerCase() == 'bye') {
        twiml.message('Goodbye');
    } else if(req.body.Body.toLowerCase() === 'petrol prices') {
        let resp = await sendMessage();
        twiml.message(resp);
    } else if (req.body.Body.toLowerCase() === 'hi') {
        twiml.message('Hello there..!!');
    } else {
        twiml.message(req.body.Body);
    }
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

app.get('/secretsanta', async (req, res) => {
    res.send('<h1>Hi Preetima this is a test message and can be teeaked to a clue.</h1>');
})

// Starting server to operate on
app.listen(port, () => {
    console.log(`Elastic search instance listening at ${port}`)
});
