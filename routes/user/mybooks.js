module.exports = function(router, passport, db) {
	router.get("/user/myBooks", (req,res) => {
		db.book.getAllUserBooks(req.session.passport.user)
		.then(result => {

		})
	})		
}