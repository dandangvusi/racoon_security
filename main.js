'use strict';
const axios = require('axios');
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const mqtt = require('mqtt');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const expressValidator = require('express-validator');
const passport = require('passport');
const nodemailer = require('nodemailer');
const homeController = require('./controllers/homeController');
const contactController = require('./controllers/contactController');
const faqController = require('./controllers/faqController');
const userController = require('./controllers/userController');
const alertController = require('./controllers/alertController');
const sensorController = require('./controllers/sensorController');
const User = require('./models/user');

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

router.use(express.static("public"));
router.use(layouts);
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);
router.use(express.json());
router.use(cookieParser("raccoon"));
router.use(
    expressSession({
        secret: "raccoon",
        cookie: {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
);
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());
router.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});
router.use(expressValidator());
router.use(homeController.logRequestPaths);

// const host = 'io.adafruit.com';
// const port = 1883;
// const connectUrl = `mqtt://${host}`;


<<<<<<< HEAD
// const client = mqtt.connect(connectUrl, {
//     clean: true,
//     port: 1883,
//     connectTimeout: 4000,
//     username: 'dan_dang',
//     password: 'aio_KWDx40oG4Co8vyxynKWIGdluWdet',
//     reconnectPeriod: 1000,
// });
=======
const client = mqtt.connect(connectUrl, {
    clean: true,
    port: 1883,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
});
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405

// const topic1 = 'dan_dang/feeds/bbc-sensor';
// const topic2 = 'dan_dang/feeds/bbc-led';
// const topic3 = 'dan_dang/feeds/bbc-buzzer';
// client.on('connect', () => {
//     console.log("Successfully connected to adafruit");
//     client.subscribe([topic1], () => {
//         console.log(`Subscribe to topic '${topic1}'`)
//       });
// });

// client.on('message', (topic, message) => {
//     console.log('Received Message:', topic, parseInt(message));
//     var ledData = "0";
//     var buzzerData = "0";
//     if(parseInt(message) == 0){
//         ledData = "1";
//         buzzerData = "1";
//         client.publish(topic2, '1', { qos: 0, retain: false }, (error) => {
//             if (error) {
//               console.error(error)
//             }
//             console.log('Send Message: 1 ', topic2);
//         });
//         client.publish(topic3, '1', { qos: 0, retain: false }, (error) => {
//             if (error) {
//               console.error(error)
//             }
//             console.log('Send Message: 1 ', topic3);
//         });
//     }
//     axios.post("http://localhost:3000/", {data: parseInt(message), ledStatus: ledData, buzzerStatus: buzzerData});
// });

router.get("/users/new", userController.new);
router.post("/users/create", userController.validate, userController.create, userController.redirectView);
router.get("/users/login", userController.login);
router.post("/users/login", userController.authenticate);
router.get("/users/logout", userController.logout, userController.redirectView);
router.put("/users/:id/update", userController.update, userController.redirectView);

router.get("/users/:id", userController.show, userController.showView);

router.delete("/alerts/:id/delete", alertController.delete, alertController.redirectView);

router.get("/", homeController.checkAuthen, homeController.fetchSensor, homeController.fetchAlert, homeController.fetchLed, homeController.fetchBuzzer, homeController.indexView);
router.post("/", homeController.sendMail, homeController.update, homeController.updateLed, homeController.updateBuzzer, homeController.redirectView);

router.get("/mqtt", sensorController.connectMQTT, (req, res) => {
    res.redirect("/");
})

router.get("/pages-contact", contactController.indexView);

<<<<<<< HEAD
router.get("/pages-faq", faqController.indexView);

router.get("/users-profile", userController.indexView);

router.post("/messages", homeController.sendMessage);

// router.post("/leds", (req, res, next) => {
//     client.publish(topic2, req.body.ledStatus, { qos: 0, retain: false }, (error) => {
//         if (error) {
//           console.error(error)
//         }
//         console.log('Send Message: ', req.body.ledStatus, topic2);
//         next();
//     });
// }, homeController.updateLed, homeController.redirectView);

router.post("/leds", sensorController.publishLed, homeController.updateLed, homeController.redirectView);
router.post("/buzzers", sensorController.publishBuzzer, homeController.updateBuzzer, homeController.redirectView);

// router.post("/buzzers", (req, res, next) => {
//     client.publish(topic3, req.body.buzzerStatus, { qos: 0, retain: false }, (error) => {
//         if (error) {
//           console.error(error)
//         }
//         console.log('Send Message: ', req.body.ledStatus, topic3);
//         next();
//     });
// }, homeController.updateBuzzer, homeController.redirectView);

app.use("/", router);
=======
router.get("/", homeController.index, homeController.indexView);


router.put("/update_view", homeController.update, homeController.index, homeController.indexView);
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
