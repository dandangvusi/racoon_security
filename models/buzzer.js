
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