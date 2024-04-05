const mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://dtsri:70cSkQUTAlOxt7um@backendserver.dtx9lbp.mongodb.net/users"
);

//creating a schema
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
});

//creating a User Model aka creating a class
const User = mongoose.model("USER", UserSchema);

//instantiating the class

module.exports = {
	User,
};
