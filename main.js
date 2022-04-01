'use strict';
const axios = require('axios');
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const mqtt = require('mqtt');
const homeController = require('./controllers/homeController');

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://localhost:27017/raccoon_security",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to raccoon_security MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use("/", router);

router.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);
router.use(layouts);
router.use(express.static("public"));
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());

const host = 'io.adafruit.com';
const port = 1883;
const connectUrl = `mqtt://${host}`;


const client = mqtt.connect(connectUrl, {
    clean: true,
    port: 1883,
    connectTimeout: 4000,
    username: 'dan_dang',
    password: 'aio_umiW94zDKiEFMhL7VWlp4YVEU2T4',
    reconnectPeriod: 1000,
});

const topic1 = 'dan_dang/feeds/bbc-sensor';
const topic2 = 'dan_dang/feeds/bbc-led';
client.on('connect', () => {
    console.log('Connected');
    client.subscribe([topic1], () => {
        console.log(`Subscribe to topic '${topic1}'`)
      });
});

client.on('message', (topic, message) => {
    console.log('Received Message:', topic, parseInt(message));
    if(parseInt(message) == 0){
        client.publish(topic2, '1', { qos: 0, retain: false }, (error) => {
            if (error) {
              console.error(error)
            }
            console.log('Send Message: 1 ', topic2);
        });
    }else{
        client.publish(topic2, '0', { qos: 0, retain: false }, (error) => {
            if (error) {
              console.error(error)
            }
            console.log('Send Message: 0 ', topic2);
        });
    }
    const put_req = axios.put("http://localhost:3000/update_view", {data: parseInt(message)});
});

router.get("/", homeController.index, homeController.indexView);
router.put("/update_view", homeController.update, homeController.index, homeController.indexView);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});