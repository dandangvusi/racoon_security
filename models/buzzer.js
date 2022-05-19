<<<<<<< HEAD
=======

>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
'use strict';
const mongoose = require('mongoose'),
{Schema} = mongoose;

var buzzerSchema = new Schema(
    {
        id: {type: String, required: true, unique: true},
        status: {type: Number}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Buzzer", buzzerSchema);