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
  const msg = twiml.message('Check out this sweet owl!');
  
  return toNumber;
}

const respond = async function () {
  await getPrice('whatsapp:+918093773107');
  // await getPrice('whatsapp:+918006666353');
  // await getPrice('whatsapp:+918095443759');
  // await getPrice('whatsapp:+919182417360');
}

// sendMessage();
module.exports = respond;
