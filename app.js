const fs = require("fs")
const http = require('http')
const https = require('https')
const express = require('express')
const app = express()
const path = require('path');
const cookieParser = require('cookie-parser')
app.set('port', (process.env.PORT || 3000));
const session = require('express-session');
const router = express.Router()
const passport = require('passport')
const db = require("./models/index");
//open ssl keys for https
//for deployment only, recreate certificates in case of domain name or server change. Check instructions
var privateKey = fs.readFileSync('./certs/friendlyBooks-key.pem' );
var certificate = fs.readFileSync('./certs/friendlyBooksKey-csr.pem' );

(async function(db) {
	await db.sequelize.sync({force: true})
		  .then(()=> {
			   //create mock data
  			return db.book.bulkCreate(require("./models/mockBookData.json"))
  		})
      .catch(err => {
        console.log(err)
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

if(process.env.NODE_ENV === "production") {
  https.createServer({
      key: privateKey,
      cert: certificate
  }, app).listen(port, function() {
    console.log("Node app is running on port", app.get('port'), " and the HTTPS protocol")
  });
}
else {
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
}

module.exports = app //for testing