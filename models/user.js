<<<<<<< HEAD
'use strict';

const mongoose = require('mongoose'),
{Schema} = mongoose,
passportLocalMongoose = require("passport-local-mongoose"),
userSchema = new Schema(
    {
        name: {
            first: {
                type: String,
                trim: true
            },
            last: {
                type: String,
                trim: true
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        address: {
            type: String
        },
        phoneNumber: {
            type: String
        }
    }
);

userSchema.virtual("fullName").get(function(){
    return `${this.name.first} ${this.name.last}`;
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

=======
'use strict';

const mongoose = require('mongoose'),
{Schema} = mongoose,
passportLocalMongoose = require("passport-local-mongoose"),
userSchema = new Schema(
    {
        name: {
            first: {
                type: String,
                trim: true
            },
            last: {
                type: String,
                trim: true
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        address: {
            type: String
        },
        phoneNumber: {
            type: String
        }
    }
);



userSchema.virtual("fullName").get(function(){
    return `${this.name.first} ${this.name.last}`;
});


userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
module.exports = mongoose.model("User", userSchema);