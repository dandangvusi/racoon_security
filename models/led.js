'use strict';
const mongoose = require('mongoose'),
{Schema} = mongoose;



var ledSchema = new Schema(
    {
        id: {type: String, required: true, unique: true},
        status: {type: Number}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Led", ledSchema);