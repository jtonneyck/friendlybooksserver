module.exports = function(router, passport, db) {
	router.get("/user/alluserbooks", (req,res) => {

		db.book.getAllUserBooks(req.session.passport.user)
		.then(books => {
			console.log(JSON.stringify(books, null, 2))
			res.status(200).json(books)
		}) 			
	})		
}