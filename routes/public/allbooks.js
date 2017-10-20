module.exports = function(router, passport, db) {
	router.get("/public/allbooks", (req,res) => {

		db.book.getAllBooks()
		.then(books => {
			console.log(JSON.stringify(books, null, 2))
			res.status(200).json(books)
		}) 			
	})		
}