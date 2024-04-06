const express = require("express");
const { z } = require("zod");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
//creating a User Schema for zod input validation

const UserSchema = z.object({
	username: z.string().email(),
	password: z
		.string()
		.min(6, { message: "minimum of 6 characters in length" })
		.max(22, { message: "maximum of 22 characters in length" }),
	firstName: z.string(),
	lastName: z.string(),
});

router.post("/signup", async (req, res) => {
	const { username, password, firstName, lastName } = req.body;

	//safeparse return an object {success:true, data}
	const userValidation = UserSchema.safeParse({
		username,
		password,
		firstName,
		lastName,
	});

	if (!userValidation.success) {
		res.status(411).json({
			message: `Incorrect inputs have been entered`,
		});
		//handle error
	} else {
		const findUser = await User.findOne({ username });

		//only create a new user if we cant find a existingin one in database
		if (!findUser) {
			const newUser = new User({
				username,
				password,
				firstName,
				lastName,
			});

			//methods can only be accessed on the instances of the Model
			const hashPassword = await newUser.createHash(newUser.password);
			newUser.password = hashPassword;
			await newUser.save();
			const userId = newUser._id;
			const token = jwt.sign({ userId }, JWT_SECRET);
			res.status(200).json({
				message: `${userId} is the userId of the newly added user`,
				token,
			});
		} else {
			res.status(411).json({
				message: `User:${findUser?.username} already exists`,
			});
		}
	}
});

module.exports = router;
