module.exports = function(router, db) {
	router.post("/auth/checkavailability", (req, res) => {
		var email = req.body.email
		var username = req.body.username
		console.log("CHECKIN AVAILABILITY" + username + email)
		db.user.checkAvailability(username, email)
		.then( available => {
			if( available === true) {
				res.status(200)
				res.json("Available")
			}
			else if(available == "email taken") {
				res.status(400)
				res.json("email taken")
			}
			else if (available == "username taken") {
				res.status(400)
				res.append('message', 'username taken');
				res.json("username taken")
			}
			else {
				res.status(500)
				res.json("Unknown server error")
			}
		})
		
	})
}