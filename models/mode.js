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

module.exports = mongoose.model("Mode", alertMode);