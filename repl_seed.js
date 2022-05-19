const mongoose = require('mongoose');
const Sensor = require('./models/sensor');
const Led = require('./models/led');
const Buzzer = require('./models/buzzer');
const Mode = require('./models/mode');
mongoose.connect(
    "mongodb://localhost:27017/raccoon_security",
    { useNewUrlParser: true }
);
mongoose.connection;
// var sensor1 = {id: 'D001', status: 0};
// Sensor.create({
//     id: sensor1.id,
//     status: sensor1.status
// })
// Promise.all(commands)
// .then(r => {
//     console.log(JSON.stringify(r));
//     mongoose.connection.close();
// })
// .catch(error => {
//     console.log(`ERROR: ${error}`);
// });
// var led1 = {id: 'L001', status: 0};
// Led.create({
//     id: led1.id,
//     status: led1.status
// })
// Promise.all(commands)
// .then(r => {
//     console.log(JSON.stringify(r));
//     mongoose.connection.close();
// })
// .catch(error => {
//     console.log(`ERROR: ${error}`);
// });
// var buzzer1 = {id: 'L001', status: 0};
// Buzzer.create({
//     id: buzzer1.id,
//     status: buzzer1.status
// })
// Promise.all(commands)
// .then(r => {
//     console.log(JSON.stringify(r));
//     mongoose.connection.close();
// })
// .catch(error => {
//     console.log(`ERROR: ${error}`);
// });

var mode1 = {status: 0};
Mode.create({
    status: mode1.status
})
Promise.all(commands)
.then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
})
.catch(error => {
    console.log(`ERROR: ${error}`);
});