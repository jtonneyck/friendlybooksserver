const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

module.exports = function(passport, db) {
	passport.use(passport.session())
	//
	//Serialize, deserialize. Not used for tokens
	//
	passport.serializeUser(function(user, done) {
		console.log("serialize: " + user)
	  	done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		db.user.findById(id)
		.then(function (user, err) {
	    	done(null, user)
		})
		.catch((err) => {
			console.log(err)
		})
	 })
	//
	//Local/ username+password strategy
	//
	passport.use(new LocalStrategy({
			usernameFields: 'username',
			passwordField: 'password'

		},
	 	function(username, password, done) {
			console.log("passport reached") 		
			db.user.localLogin(username, password)
			.then(function(user, err) {
				if (err) { 
					console.log(err)
	      			return done(err); 
	      		}
	    		if (!user) {
	    			console.log("user not returned")
	    			return done(null, false);
	    		}
	    		if (!user.verifyPassword(password)) {
	    			console.log("Wrong password")
	    			return done(null, false);
	    		}
	    		console.log("log in correct " + user)
	    		return done(null, user);
	    	});
	  	}
	))
	//
	//Facebook Strategy
	//
	passport.use(new FacebookStrategy({
	    clientID: "1906152359644967", //test
	    clientSecret: "fbc91b3634ecdc3098325c6690a77ce7", // test
	    callbackURL: "http://localhost:3000/auth/facebookcb", //dev
  		profileFields: ['email', 'name', 'gender'],
  		enableProof: true
	  },
	  function(accessToken, refreshToken, profile, done) {
	    db.user.findOrCreate({where: 
	    	{facebookId: profile.id}, 
	    		defaults: {
	    		firstName: profile.name.givenName,
	    		lastName: profile.name.familyName,
	    		email: profile.emails[0].value
	    	}
	    })
	    .then(function(user, err) {
	   	if (err) { return done(err); }
	      done(null, user[0]); //findOrCreate returns an array with user and boolean (found/false or created/true)
	    }) 
	   } 
	))
	//
	//JSON Webtoken Strategy
	//
	var jwtOptions = {}
	var cookieExtractor = function(req) {
		console.log("cookieextractor reached")
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
	jwtOptions.jwtFromRequest = cookieExtractor

	ExtractJwt.fromAuthHeaderWithScheme('jwt')	;
	jwtOptions.secretOrKey = 'tasmanianDevil';

	passport.use(new JwtStrategy(jwtOptions, 
		function(jwtPayload, next) {
			console.log("JWT AUTH REACHEEEEED")
			console.log('payload received' + jwtPayload);
			db.user.findById(jwtPayload.id)
			.then((user) => {
				if (user) {
					next(null, user);
				  } 
				else {
				 	next(null, false);
				 }
			})
		}
	))
}	