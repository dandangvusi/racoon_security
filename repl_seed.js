const mongoose = require('mongoose');
const Sensor = require('./models/sensor');
mongoose.connect(
    "mongodb://localhost:27017/raccoon_security",
    { useNewUrlParser: true }
);
mongoose.connection;
var sensor1 = {id: 'D001', status: 0};
Sensor.create({
    id: sensor1.id,
    status: sensor1.status
})
Promise.all(commands)
.then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
})
.catch(error => {
    console.log(`ERROR: ${error}`);
});