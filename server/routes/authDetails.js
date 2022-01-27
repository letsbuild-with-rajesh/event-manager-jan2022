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
					"loggedIn": true,
					"isAdmin": req.user.role === 'admin'
				})
				return;
			} catch (e) {
				console.log(e);
			}
		}
		res.status(200).json({
			"loggedIn": false,
			"isAdmin": false
		})
	}
);

module.exports = router;
