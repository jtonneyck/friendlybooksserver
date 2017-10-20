module.exports = function(sequelize, DataTypes) {
	let Library = sequelize.define('library', {
		name: {
			type: DataTypes.STRING
		},
		location: {
			type: DataTypes.STRING //right type? pref longtitude latitude
		}
	});

	Library.associate = function(models) {
		Library.hasMany(models.book)
	}
	return Library
}