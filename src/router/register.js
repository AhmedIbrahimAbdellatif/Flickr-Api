const express = require('express');
const router = new express.Router();

const jwt = require('jsonwebtoken');
const CustomError = require('../error/custom-error');
const User = require('../model/user');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

router.post('/signup', async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, age } = req.body;
        if (!email) {
            res.status(400).json({
                message: 'Email is required',
            });
            return;
        }
        if (!password) {
            res.status(400).json({
                message: 'Password is required',
            });
            return;
        }
        if (!firstName) {
            res.status(400).json({
                message: 'First Name is required',
            });
            return;
        }
        if (!lastName) {
            res.status(400).json({
                message: 'Last Name is required',
            });
            return;
        }
        if (!age) {
            res.status(400).json({
                message: 'Age is required',
            });
            return;
        }
        if(password.length < 8){
            res.status(400).json({
                message: 'Password must be more than 8 characters',
            });
            return;
        }
        if (await User.findOne({ email })) {
            res.status(403).json({
                message: 'User Already Exists',
            });
            return;
        }
        const newUser = await User.create({
            email,
            password,
            firstName,
            lastName,
            age,
        });
        const token = signToken(newUser._id);
        res.status(201).json({
            accessToken: token,
            _id: newUser._id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            age: newUser.age,
        });
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            res.status(400).json({
                message: 'Email is required',
            });
            return;
        }
        if (!password) {
            res.status(400).json({
                message: 'Password is required',
            });
            return;
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            res.status(401).json({
                message: 'Invalid Credentials',
            });
            return;
        }

        const token = signToken(user._id);
        res.status(200).json({
            accessToken: token,
        });
    } catch (error) {
        res.status(500).send();
    }
});
module.exports = router;
