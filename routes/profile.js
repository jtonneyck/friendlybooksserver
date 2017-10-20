module.exports = function(router, passport) {
	router.get("/profile", isLoggedIn, (req,res) => {
		res.send("welcome to your profile page!")
	})		
}

// var isLoggedIn = function (req, res, next) {
// 	if(req.user) {
// 		next()
// 	}
// 	else {
// 		res.status(401)
// 		return res.send("Not logged in");
// 	}
// }
