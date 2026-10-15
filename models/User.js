console.log("User.js is loading");

//Grab two things from the Sequelize package
const { Model, DataTypes } = require("sequelize");
//Connection we built
const sequelize = require("../config/connection");

//the blueprint, User borrows everything from Model
class User extends Model {}

// DESCRIBE THE TABLE
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    sequelize,
    timestamps: false, // don't add createdAt / updatedAt columns
    freezeTableName: true,
    underscored: true, // use comment_text style, not commentText
    modelName: "user",
  },
);
module.exports = User;
