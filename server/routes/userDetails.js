const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get(
	"/",
	[],
	async (req, res) => {
		const token = req.header("token");
		if (token) {
			try {
				const decoded = jwt.verify(token, "randomString");
				req.user = decoded.user;

				res.status(200).json({
					"name": req.user.name,
					"email": req.user.email,
					"role": req.user.role
				})
				return;
			} catch (e) {
				console.log(e);
			}
		}
		res.status(200).json({
			"name": "",
			"email": "",
			"role": ""
		})
	}
);

module.exports = router;