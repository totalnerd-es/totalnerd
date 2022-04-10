const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

// get all users
router.get('/', auth, async (req, res) => {
	const users = await User.find().sort('name');
	res.send(users);
});

// get user by ID
router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	res.send(user);
});

// create new user
router.post('/', auth, async (req, res) => {
	const { error } = validate(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered');

	user = new User(_.pick(req.body, ['name','email','password']));
	const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

// update existing user by ID
router.put('/:id', auth, async (req, res) => {
	const { error } = validate(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findByIdAndUpdate(req.params.id, _.pick(req.body, ['_id', 'name', 'email']), {
		new: true
	});

	if (!user) return res.status(404).send('The user with the given ID was not found.');

	res.send(user);
});

// delete user by ID
router.delete('/:id', auth, async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;