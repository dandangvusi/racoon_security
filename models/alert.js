'use strict';
const mongoose = require('mongoose'),
{Schema} = mongoose;

var alertSchema = new Schema(
    {
        id: {type: String, required: true},
        alert_time: {type: Date}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Alert", alertSchema);