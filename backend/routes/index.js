/* rootRouter is the router that holds all the routers with respect to the endPoints */

const express = require("express");
const userRouter = require("./user");
const { z } = require("zod");
const { authMiddleware } = require("../middleware");
const { User } = require("../db");
const { accountRouter } = require("./account");

const app = express();
const router = express.Router();

app.use("/user", userRouter);
app.use("/account", accountRouter);

const UpdateBody = z.object({
	username: z.string().optional(),
	password: z.string().optional(),
	lastName: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
	const { success } = UpdateBody.safeParse(req.body);

	if (!success) {
		res.status(411).json({
			message: "error while updating information",
		});
	}

	//to find the record and update it
	await User.updateOne({ _id: req.userId }, req.body);
	res.status(200).json({
		message: "updated Successfully",
	});
});

module.exports = router;
