var path = require('path');

module.exports = function(router, passport) {
	router.post("/auth/login", function(req, res, next) {console.log("login reaced"); next()},
		 passport.authenticate('local'),
		 
		 (req, res) => {
		 	res.status(200).json("Logged in")
		 }
	)		 
	router.get("auth/login", (req, res) => {
		console.log("User session" + JSON.stringify(req.session, null, 2))
    	res.sendFile(path.join(__dirname + '/../../views/login.html'));
	})
}