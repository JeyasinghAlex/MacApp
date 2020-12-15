const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const passport = require('passport');

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? true : false;
}

exports.signUp = async (user, role, res) => {
    try {
        let isEmailRegistered = await validateEmail(user.email);
        if (isEmailRegistered) {
            return res.status(400).json({
                message: `Email is already registered.`,
                success: false
            });
        }

        const password = await bcrypt.hash(user.password, 10);
        const newUser = new User({
            ...user,
            role,
            password
        });
        console.log(newUser);
        await newUser.save();
        return res.status(201).json({
            message: "Hurry! now you are successfully registred. Please nor login.",
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to create your account.",
            success: false
        });
    }
}

exports.signIn = async (loginDetails, res) => {
    let { email, password } = loginDetails;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(403).json({
            message: "Email is not found. Invalid login credentials.",
            success: false
        });
    }

    // if (user.role !== role) {
    //     return res.status(403).json({
    //         message: "Please make sure you are logging in from the right portal.",
    //         success: false
    //     });
    // }
    let isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        let result = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: `Bearer ${token}`,
            expiresIn: 168
        };
        return res.status(200).json({
            ...result,
            message: "success",
            success: true
        });
    } else {
        return res.status(403).json({
            message: "Incorrect password.",
            success: false
        });
    }
}

exports.userAuth = passport.authenticate('jwt', { session: false });

exports.serializeUser = user => {
    return {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        category: user.category,
        contact: user.contact
    };
};

exports.checkRole = roles => (req, res, next) => {
    if (roles.includes(req.user.role)) {
        return next()
    }
    return res.status(401).json({
        message: "Unauthorized",
        success: false
    });
}