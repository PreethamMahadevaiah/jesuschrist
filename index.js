const accountSid = 'ACbd20effaa2e19d301c6aa624040ff397';
const authToken = '6d017276a1c14bf4cbde3d327691c51c';
const mashapeKey = 'qNVjDBKQs5mshYAlM1U1uE2fJVxdp1egzT0jsnoKCoOxDRj0cs';
const fromNumber = '+552120420682';
const toNumber = '+918093773107';
const city = 'Hyderabad';
const client = require('twilio')(accountSid, authToken);
const rp = require('request-promise');
exports.handler = async (event) => {
    console.log('Initiated APP')    
    const options = {
        uri: 'https://newsrain-petrol-diesel-prices-india-v1.p.mashape.com/capitals',
        headers: {
            'X-Mashape-Key': mashapeKey,
            'Accept': 'application/json'
        }
    };    
    try {
        const result = await rp(options);        
        const cities = JSON.parse(result).cities;        
        let price = 0;
        // Get price of Hyderabad
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].city === city) {
                price = cities[i].petrol;
            }
        }
        // Send whatsapp message
        console.log('Trying to send a message.')
        const message = await client.messages.create({
            body: `Petrol price is ₹ ${price} per liter.`,
            from: fromNumber,
            to: toNumber
        });
        // Return the message sid
        return message.sid;
    } catch (e) {
        console.log(e.message);
    }    
};