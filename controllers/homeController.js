'use strict';
const Sensor = require('../models/sensor');

module.exports = {
    index: (req, res, next) => {
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
    indexView: (req, res) => {
        res.render('index');
    },
    update: (req, res, next) => {
        Sensor.findOneAndUpdate({id: 'D001'}, {status: req.body.data}, {new: true}, (err, doc) => {
            if(err){
                console.log('Error updating sensor status.');
            }
            else{
                console.log(doc);
            }
        });
        next();
    }
}