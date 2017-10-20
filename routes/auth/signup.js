var path = require('path');

module.exports = function(router, db) {
	router.get("/signup", (req, res) => {
    	res.sendFile(path.join(__dirname + '/../../views/signup.html'));
	})
	router.post("/auth/signup", (req, res)=> {
		let username = req.body.username
		let password = req.body.password
		let email = req.body.email
		let firstname = req.body.firstname
		let lastname = req.body.lastname

		//username, email, firstname, lastname, password
		db.user.localSignUp(username, email, firstname, lastname, password)
		.then(result => {
			if(result.username) {
				console.log("available")
				res.status(200)
				res.json("User created *server")
			}
			else if (result === "taken"){
				console.log("taken")
				res.status(400)
				res.send("Username or email already taken")
			}
			else {
				res.status(500)
				res.send("Unknown server error")
			}
		})
	})
}