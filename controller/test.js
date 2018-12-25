'use strict';

const accountSid = 'ACbd20effaa2e19d301c6aa624040ff397';
const authToken = '6d017276a1c14bf4cbde3d327691c51c';
const mashapeKey = 'qNVjDBKQs5mshYAlM1U1uE2fJVxdp1egzT0jsnoKCoOxDRj0cs';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const rp = require('request-promise');


// Petrol price API
const options = {
    uri: 'https://newsrain-petrol-diesel-prices-india-v1.p.mashape.com/capitals',
    headers: {
        'X-Mashape-Key': mashapeKey,
        'Accept': 'application/json'
    }
};

async function getPrice(toNumber) {
    const city = 'New Delhi'
    try {
        const result = await rp(options);
        const cities = JSON.parse(result).cities;
        let price = 0;
        let body = ''
        // console.log(cities)
        // Get price of Hyderabad
        for (let i = 0; i < cities.length; i++) {
            body = body + `Price in ${cities[i].city} is ${cities[i].petrol} \n`;
            if (cities[i].city === city) {
                price = cities[i].petrol;
                // body = `Price in ${cities[i].city} is cities[i].petrol \n`
            }
        }
        // Send whatsapp message
        // console.log(`Sending message to ${toNumber}`);
        // const message = await client.messages.create({
        //     // body: `Petrol price in ${city} is ₹ ${price} per liter.`,
        //     body: body,
        //     from: 'whatsapp:+552120420682',
        //     to: toNumber
        // })
        //     .done(console.log(`Message has been succesfully forwarded to ${toNumber}`));
        // Return the message sid
        return body;
    } catch (e) {
        console.log(e.message);
    }
}

const sendMessage = async function () {
    let resp = await getPrice('whatsapp:+918093773107');
    return resp;
    // await getPrice('whatsapp:+918006666353');
    // await getPrice('whatsapp:+918095443759');
    // await getPrice('whatsapp:+919182417360');
    // client.messages
    //     .create({
    //         body: 'Hello there!',
    //         from: 'whatsapp:+552120420682',
    //         to: 'whatsapp:+918093773107'
    //     })
    //     .then(message => console.log(message.sid))
    //     .done()
}

// sendMessage();
module.exports = sendMessage;
