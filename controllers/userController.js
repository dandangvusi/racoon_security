<<<<<<< HEAD
'use strict';

const User = require('../models/user'),
passport = require('passport'),
getUserParams = body => {
    return {
        name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        password: body.password,
        address: body.address,
        phoneNumber: body.phoneNumber
    };
};

module.exports = {
    indexView: (req, res) => {
        res.render('users-profile');
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    new: (req, res) => {
        res.render("users/new");
    },
    create: (req, res, next) => {
        if (req.skip) return next();
        let newUser = new User(getUserParams(req.body));
        User.register(newUser, req.body.password, (error, user) => {
          if (user) {
            req.flash("success", `${user.fullName}'s account created successfully!`);
            res.locals.redirect = "/users/login";
            next();
          } else {
            req.flash("error", `Failed to create user account because: ${error.message}.`);
            res.locals.redirect = "/users/new";
            next();
          }
        });
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },
    showView: (req, res) => {
        res.render('users/profile');
    },
    update: (req, res, next) => {
        let userId = req.params.id;
        let userParams = getUserParams(req.body);
        // console.log(`userParams: ${userParams.name.first} ${userParams.name.last} ${userParams.email} ${userParams.password} ${userParams.address} ${userParams.phoneNumber}`); //test
        User.findByIdAndUpdate(userId, {
            $set: userParams
        }, {new: true})
        .then(user => {
            // res.locals.redirect = `/users/${userId}`;
            res.locals.redirect = `/`;
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
        });
    },
    login: (req, res) => {
        res.render('users/login', {layout: false});
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        // successRedirect: "/",
        successRedirect: "/mqtt",
        successFlash: "Logged in!"
    }),
    validate: (req, res, next) => {
        req
        .sanitizeBody("email")
        .normalizeEmail({
            all_lowercase: true
        })
        .trim();
        req.check("email", "Email is invalid").isEmail();
        req.check("password", "Password cannot be empty").notEmpty();
        req.getValidationResult().then(error => {
          if (!error.isEmpty()) {
            let userId = req.params.id;
            let messages = error.array().map(e => e.msg);
            req.skip = true;
            req.flash("error", messages.join(" and "));
            res.locals.redirect = `/users/${userId}`;
            next();
          } else {
            next();
          }
        });
    },
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/users/login";
        next();
    }
=======
'use strict';

const User = require('../models/user'),
passport = require('passport'),
getUserParams = body => {
    return {
        name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        password: body.password,
        address: body.address,
        phoneNumber: body.phoneNumber
    };
};

module.exports = {
    indexView: (req, res) => {
        res.render('users-profile');
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    new: (req, res) => {
        res.render("users/new");
    },
    create: (req, res, next) => {
        if (req.skip) return next();
        let newUser = new User(getUserParams(req.body));
        User.register(newUser, req.body.password, (error, user) => {
          if (user) {
            req.flash("success", `${user.fullName}'s account created successfully!`);
            res.locals.redirect = "/users/login";
            next();
          } else {
            req.flash("error", `Failed to create user account because: ${error.message}.`);
            res.locals.redirect = "/users/new";
            next();
          }
        });
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },
    showView: (req, res) => {
        res.render('users/profile');
    },
    update: (req, res, next) => {
        let userId = req.params.id;
        let userParams = getUserParams(req.body);
        // console.log(`userParams: ${userParams.name.first} ${userParams.name.last} ${userParams.email} ${userParams.password} ${userParams.address} ${userParams.phoneNumber}`); //test
        User.findByIdAndUpdate(userId, {
            $set: userParams
        }, {new: true})
        .then(user => {
            res.locals.redirect = `/users/${userId}`;
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
        });
    },
    login: (req, res) => {
        res.render('users/login', {layout: false});
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        // successRedirect: "/",
        successRedirect: "/mqtt",
        successFlash: "Logged in!"
    }),
    validate: (req, res, next) => {
        req
        .sanitizeBody("email")
        .normalizeEmail({
            all_lowercase: true
        })
        .trim();
        req.check("email", "Email is invalid").isEmail();
        req.check("password", "Password cannot be empty").notEmpty();
        req.getValidationResult().then(error => {
          if (!error.isEmpty()) {
            let userId = req.params.id;
            let messages = error.array().map(e => e.msg);
            req.skip = true;
            req.flash("error", messages.join(" and "));
            res.locals.redirect = `/users/${userId}`;
            next();
          } else {
            next();
          }
        });
    },
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/users/login";
        next();
    }
>>>>>>> df1cbf6e7b7b5f31fd94d245144dee5d1d27f405
};