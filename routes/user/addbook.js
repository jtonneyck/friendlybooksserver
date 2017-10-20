module.exports = function(router, passport, db) {
	router.post("/user/addbook", (req,res) => {
		// later for association req.session.passport.user

		console.log("Add book reached")
		let book = {
			ownerId: req.session.passport.user,
			title: req.body.title,
			author: req.body.author,
			isbn: req.body.isbn
		}
		console.log("The added book" + JSON.stringify(book, null,2))
		db.book.addBook(book)
		.then(result => {
			if(result === "success") {
				res.status(200).json(result)
			}
			else {
				res.status(500).end()
			}
		})
	})		
}