'use strict';
const Sensor = require('../models/sensor');
const Alert = require('../models/alert');
const Led = require('../models/led');
const Buzzer = require('../models/buzzer');
const Mode = require('../models/mode');
const axios = require('axios');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: '', 
        pass: '' 
    }
});

module.exports = {
    checkAuthen: (req, res, next) => {
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect("/users/login");
        }
    },
    fetchMode: (req, res, next) => {
        Mode.find()
        .then(modes => {
            res.locals.modes = modes;
            next();
        })
        .catch(err => {
            console.log('Error fetching modes info.');
            next(err);
        });
    },
    fetchSensor: (req, res, next) => {
        Sensor.find()
        .then(sensors => {
            res.locals.sensors = sensors;
            next();
        })
        .catch(err => {
            console.log('Error fetching sensors info.');
            next(err);
        });
    },
    fetchAlert: (req, res, next) => {
        Alert.find()
        .then(alerts => {
            res.locals.alerts = alerts;
            next();
        })
        .catch(err => {
            console.log('Error fetching alerts info.');
            next(err);
        });
    },
    fetchLed: (req, res, next) => {
        Led.find()
        .then(leds => {
            res.locals.leds = leds;
            next();
        })
        .catch(err => {
            console.log('Error fetching alerts info.');
            next(err);
        });
    },
    fetchBuzzer: (req, res, next) => {
        Buzzer.find()
        .then(buzzers => {
            res.locals.buzzers = buzzers;
            next();
        })
        .catch(err => {
            console.log('Error fetching alerts info.');
            next(err);
        });
    },
    indexView: (req, res) => {
        res.render('index');
        console.log("render index page");
    },
    update: (req, res, next) => {
        Sensor.findOneAndUpdate({id: 'D001'}, {status: req.body.data}, {new: true}, (err, doc) => {
            if(err){
                console.log('Error updating sensor status.');
            }
            else{
                if(req.body.data == 0){
                    Alert.create({
                        id: "D001",
                        alert_time: Date.now()
                    })
                }
                res.locals.redirect = "/";
                console.log(doc);
                next();
            }
        });
    },
    updateLed: (req, res, next) => {
        Led.findOneAndUpdate({id: 'L001'}, {status: req.body.ledStatus}, {new: true}, (err, doc) => {
            if(err){
                console.log('Error updating led status.');
            }
            else{
                res.locals.redirect = "/";
                console.log(doc);
                next();
            }
        });
    },
    updateBuzzer: (req, res, next) => {
        Buzzer.findOneAndUpdate({id: 'L001'}, {status: req.body.buzzerStatus}, {new: true}, (err, doc) => {
            if(err){
                console.log('Error updating buzzer status.');
            }
            else{
                res.locals.redirect = "/";
                console.log(doc);
                next();
            }
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    logRequestPaths: (req, res, next) => {
        console.log(`request made to: ${req.url}`);
        next();
    },
    sendMail: (req, res, next) => {
        console.log(`Request user: ${req.user}`);
        if(req.body.data == 0){
            var mailOptions = {
                from: 'danieldang1907@gmail.com',
                to: 'dangvusidan@gmail.com',
                subject: 'Intrusion Alert',
                text: 'We found a door is opened, please visit Raccoon security web app for detail'
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
            next();
        }else{
            next();
        }
    }
};