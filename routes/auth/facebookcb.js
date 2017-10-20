module.exports = function(router, passport) {
		router.get('/auth/facebookcb',
  			passport.authenticate('facebook', { successRedirect: '/user/profile',
                 failureRedirect: '/login' }));
	}