module.exports = function(router, passport, db) {
	router.get("/auth/logout", (req,res) => {
		console.log("log out reached, user : " + req.user)
		console.log(JSON.stringify(req.session, null, 2))
		if(req.user) {
			console.log("logged out " + req.user)
			req.logOut()
			res.status(200)
			res.json("you are now logged out")	
		}
		else {
			res.json("you were not logged in")
		}
	})
}