//https://www.terlici.com/2014/08/25/best-practices-express-structure.html
module.exports = function(router, passport, db) {
	router.use(require('cors')(corsOptions))
	router.all("/user/*", isLoggedIn)
	router.get("/hi", require("./hi"))	
	require("./public/allbooks")(router, passport, db)
	require("./user/alluserbooks")(router, passport, db)
	require("./user/profile")(router, passport, db)
	require("./user/mybooks")(router, passport, db)
	require("./user/addbook")(router, passport, db)
	require("./auth/login")(router, passport)
	require("./auth/signup")(router, db)
	require("./auth/logout")(router, passport, db)
	require("./auth/facebook")(router, passport)
	require("./auth/facebookcb")(router, passport)
	require("./auth/logintoken")(router, passport, db)
	require("./auth/checkavailability")(router, db)
	require("./secret")(router, passport)	
	require("./secretDebug")(router, passport)
}

var isLoggedIn = function(req, res, next) {
	console.log("SESSION" + JSON.stringify(req.session, null, 2))

	if(req.session.passport) {
		console.log("logged in")
		next()
	}
	else {
		console.log("not logged in")
		res.status(401)
		return res.send("Not logged in");
	}
}

var whitelist = ["*"]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", "true")
//   next();
// });
