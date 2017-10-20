  const bcrypt = require("bcrypt");
  const Sequelize = require("sequelize");
  const Op = Sequelize.Op;

  module.exports = function(sequelize, DataTypes){    
  const User =  sequelize.define('user', {
    username: {
      type: DataTypes.STRING
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    facebookId:  {
      type: DataTypes.STRING
    }
  })
  
  User.belongsToMany(User, {as: "friends", through: "UserFriends"})

  User.associate = function(models) {
      User.hasMany(models.book, {as: "owner", foreignKey: "ownerId"});
  }


  User.prototype.verifyPassword = function(password) {
    if(bcrypt.compareSync(password, this.password)) {
      return true
    }
    else {
      return false
    }
  };

  User.getUserInfo = function(userId) {
    return User.findById(userId)
    .then(result => {
      let userInfo = {
        username: result.username,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email
      }
      return userInfo
    })
  }

  User.checkAvailability = function(username, email) {
    return User.findOne({ where: { 
      username: username
    }})
    .then(result => {
      if(result == null || undefined) {
        //meaning username is available
        return User.findOne({where: {
          email: email
        }})
        .then( result => {
          if(result == null || undefined) {
            return true
          }
          else {
            return "email taken"
          }
        })  
      }
      else if (result.username) {
        return "username taken"
      }
      else {
        return "server error"
      }
    })
  }

  User.localLogin = function(usernameOrEmail, password) {
    return User.findOne({where: {
      $or: [ 
        {
          email: usernameOrEmail
        },
          { username: usernameOrEmail}
      ]}
    })
  }

  User.localSignUp = function(username, email, firstname, lastname, password) {   
    return User.findOne({ where: {
        username: username
      }
    })
    .then(result => {
        if(result == undefined || null) { //user not found
          return User.create({
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
        }) 
        }
        else {
            return "taken"
        }        
    }) 
  }

  return User
}

