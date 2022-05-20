'use strict';

const mqtt = require('mqtt');
const axios = require('axios');

const host = 'io.adafruit.com';
const port = 1883;
const connectUrl = `mqtt://${host}`;

const topic1 = 'dan_dang/feeds/bbc-sensor';
const topic2 = 'dan_dang/feeds/bbc-led';
const topic3 = 'dan_dang/feeds/bbc-buzzer';

<<<<<<< HEAD
// const topic1 = 'CSE_BBC/feeds/bk-iot-magnetic';
// const topic2 = 'CSE_BBC/feeds/bk-iot-led';
// const topic3 = 'CSE_BBC/feeds/bk-iot-speaker';

=======
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
const prgMqtt = require('./mqttConnect')

module.exports = {
    connectMQTT: (req, res, next) => {
<<<<<<< HEAD
        // console.log(`Request user: ${req.user}`);
=======
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
        const client = mqtt.connect(connectUrl, {
            clean: true,
            port: 1883,
            connectTimeout: 4000,
<<<<<<< HEAD
            username: 'dan_dang',
            password: 'aio_CkXS12AaOHHdfOTxFbwqxlMwSTsS',
            // username: 'CSE_BBC',
            // password: 'aio_CkXS12AaOHHdfOTxFbwqxlMwSTsS',
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
<<<<<<< HEAD
            else {
                client.publish(topic2, '0', { qos: 0, retain: false }, (error) => {
                    if (error) {
                    console.error(error)
                    }
                    console.log('Send Message: 0 ', topic2);
                });
                client.publish(topic3, '0', { qos: 0, retain: false }, (error) => {
                    if (error) {
                    console.error(error)
                    }
                    console.log('Send Message: 0 ', topic3);
                });
            }
            axios.post("http://localhost:3000/", {data: parseInt(message), ledStatus: ledData, buzzerStatus: buzzerData, userEmail: req.user.email});
=======
            axios.post("http://localhost:3000/", {data: parseInt(message), ledStatus: ledData, buzzerStatus: buzzerData});
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
        });
        next();
    },
    publishLed: (req, res, next) => {
        const client = mqtt.connect(connectUrl, {
            clean: true,
            port: 1883,
            connectTimeout: 4000,
<<<<<<< HEAD
            username: 'dan_dang',
            password: 'aio_CkXS12AaOHHdfOTxFbwqxlMwSTsS',
            // username: 'CSE_BBC',
            // password: 'aio_CkXS12AaOHHdfOTxFbwqxlMwSTsS',
=======
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
            reconnectPeriod: 1000,
        });
        client.publish(topic2, req.body.ledStatus, { qos: 0, retain: false }, (error) => {
            if (error) {
              console.error(error)
            }
            console.log('Send Messages: ', req.body.ledStatus, topic2);
            next();
        });
    },
    publishBuzzer: (req, res, next) => {
        const client = mqtt.connect(connectUrl, {
            clean: true,
            port: 1883,
            connectTimeout: 4000,
<<<<<<< HEAD
            username: 'dan_dang',
            password: 'aio_CkXS12AaOHHdfOTxFbwqxlMwSTsS',
            // username: 'CSE_BBC',
            // password: 'aio_CkXS12AaOHHdfOTxFbwqxlMwSTsS',
=======
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
            reconnectPeriod: 1000,
        });
        client.publish(topic3, req.body.buzzerStatus, { qos: 0, retain: false }, (error) => {
            if (error) {
              console.error(error)
            }
            console.log('Send Message: ', req.body.buzzerStatus, topic3);
            next();
        });
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
