module.exports  = function(router, passport) {
		router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
	}