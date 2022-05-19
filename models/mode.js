'use strict';
const mongoose = require('mongoose'),
{Schema} = mongoose;

var alertMode = new Schema(
    {
        status: {type: Number}
    },
    {
        timestamps: true
    }
);

<<<<<<< HEAD
=======


>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
module.exports = mongoose.model("Mode", alertMode);