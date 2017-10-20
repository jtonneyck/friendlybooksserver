
module.exports = function(sequelize, DataTypes){
  let Book =  sequelize.define('book', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      isbn: {
        type: DataTypes.STRING
      },
      isbn2: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      author: { //several authors?
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING //something like not rentable, lent out, overdue, available, limitable rentable, query
      },
      thumbnail: {
        type: DataTypes.STRING
      }
  });

  Book.associate = function(models) {
    // Book.belongsTo(models.user, {as: "owner", targetKey: "borrowerId"})
    // Book.hasOne(models.user, {as: "borrower", foreignKey: "borrowId", sourceKey: "borrowId"})
  }

  Book.getAllBooks = function() {
    return Book.findAll({limit: 100})
           .then(result => {
             return JSON.stringify(result)
           })
  }
  Book.getAllUserBooks = function(userId) {
    return Book.findAll({
              where:{
                ownerId: userId
              }
            })
            .then(result =>{
              return JSON.stringify(result)
            })
  }

  Book.addBook = function(theBook) {
      console.log("Add book controller reached, " + JSON.stringify(theBook,null,2))

       return Book.create(theBook)
      .then((createdBook, err) => {
        if(err) {
          throw err
        }
        if(theBook) {
          return "success"
        }
      })
    }


  return Book
}