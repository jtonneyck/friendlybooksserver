module.exports = function(router, passport, db) {
	router.get("/user/profile", function(req, res, next) {console.log("Next reached"); next()}, (req,res) => {
		console.log("User id" + req.session.passport.user)
		db.user.getUserInfo(req.session.passport.user)
		.then(result => {
			console.log(JSON.stringify(result, null,2))
			res.status(200).json(result).end()
		})
	})		
}

