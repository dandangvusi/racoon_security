'use strict';

const mqtt = require('mqtt');

const host = 'io.adafruit.com';
const port = 1883;
const connectUrl = `mqtt://${host}`;

const topic1 = 'dan_dang/feeds/bbc-sensor';
const topic2 = 'dan_dang/feeds/bbc-led';
const topic3 = 'dan_dang/feeds/bbc-buzzer';

function prgMqtt() {
    const client = mqtt.connect(connectUrl, {
        clean: true,
        port: 1883,
        connectTimeout: 4000,
<<<<<<< HEAD
        username: 'dan_dang',
        password: 'aio_KWDx40oG4Co8vyxynKWIGdluWdet',
=======
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
        reconnectPeriod: 1000,
    });
    client.on('connect', () => {
        console.log("Successfully connected to adafruit");
        client.subscribe([topic1], () => {
            console.log(`Subscribe to topic '${topic1}'`)
        });
    });
    client.on('message', (topic, message) => {
        console.log('Received Message:', topic, parseInt(message));
        var ledData = "0";
        var buzzerData = "0";
        if(parseInt(message) == 0){
            ledData = "1";
            buzzerData = "1";
            client.publish(topic2, '1', { qos: 0, retain: false }, (error) => {
                if (error) {
                console.error(error)
                }
                console.log('Send Message: 1 ', topic2);
            });
            client.publish(topic3, '1', { qos: 0, retain: false }, (error) => {
                if (error) {
                console.error(error)
                }
                console.log('Send Message: 1 ', topic3);
            });
        }
        axios.post("http://localhost:3000/", {data: parseInt(message), ledStatus: ledData, buzzerStatus: buzzerData});
    });
}
exports.prgMqtt = prgMqtt;