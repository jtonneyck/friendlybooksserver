
module.exports = function(router, passport) {
	router.get("/secret", function(req, res, next) { console.log("REACHED SECRET"); next()}, passport.authenticate('jwt', { session: false }), function(req, res){
	  res.status(200).json({message: "Success! You can not see this without a token"});
	});	
}
