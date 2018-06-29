var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hours: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }

    });

    User.associate = function (models) {
        // User.hasMany(models.Activity, {
        //     onDelete: "cascade"
        // });
    };

    User.prototype.comparePassword = function (textpassword, hashpassword) {
        return bcrypt.compareSync(textpassword, hashpassword);
    }

    User.beforeCreate(function (user) {
        return new Promise(function (resolve, reject) {
            const hashPassword = bcrypt.hashSync(user.password);
            user.password = hashPassword;
            return resolve(null, user);
        })
    })

    return User;
}