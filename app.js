const express = require('express')
const app = express()
const path = require('path');
const cookieParser = require('cookie-parser')
app.set('port', (process.env.PORT || 3000));
const session = require('express-session');
const router = express.Router()
const passport = require('passport')
const db = require("./models/index");
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", "true")
//   next();
// });

(async function(db) {
	await db.sequelize.sync({force: true})
		  .then(()=> {
			//create mock data
			db.book.bulkCreate(require("./models/mockBookData.json"), {returning: true})
		  }).then(()=> {
        db.sequelize.sync({force: false})
      })
})(db)

require("./routes/auth/passport")(passport, db)

app.use(express.static('views'));
app.use(express.static("public"));
app.use(session({ 	  secret: 'keyboard cat',
  			resave: false,
  			saveUninitialized: true,
  			cookie: { secure: false }
}));
app.use(cookieParser())
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("body-parser").json());
app.use(passport.initialize());
app.use(passport.session());	

require("./routes/index")(router, passport, db)
app.use("/", router)

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

module.exports = app //for testing