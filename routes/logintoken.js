const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
var path = require('path');

var jwtOptions = {}
	jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')	;
	jwtOptions.secretOrKey = 'tasmanianDevil';
module.exports = function(router, passport, db) {
	router.post("/logintoken", (req, res) => {
		var username = req.body.username
		var password = req.body.password

		db.user.findOne({
			username: username
		})
		.then((user, error) => {
			if(error) {
 				res.status(500).json({error: error});
 			}
 			if(!(user)) {
 				console.log("user not found")
 				res.status(401).json({message: "Username or password incorrect"})
 			}
 			if(!user.verifyPassword(password)){
 				console.log("password incorrect " + user.verifyPassword(password))
 			 	res.status(401).json({message: "Username or password incorrect"})
 			}
 			console.log("log in correct")
 			var payload = {id: user.id};
    		var token = jwt.sign(payload, jwtOptions.secretOrKey);
    		console.log(token)
    		res.set("token", token)
			res.append("Authorization", "JWT " + token )
			res.append("Set-Cookie", "jwt=" + token)
			res.json({message: "ok", token: token})
		})
	})
	router.get("/logintoken", (req, res) => {
    	res.sendFile(path.join(__dirname + '/../views/logintoken.html'));
	})		
}