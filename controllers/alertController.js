"use strict";

const Alert = require('../models/alert');

module.exports = {
    delete: (req, res, next) => {
        let alertID = req.params.id;
        Alert.findByIdAndRemove(alertID)
        .then(() => {
            res.locals.redirect = "/";
            next();
        })
        .catch(error => {
            onsole.log(`Error deleting alert by ID: ${error.message}`);
            next();
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }
};