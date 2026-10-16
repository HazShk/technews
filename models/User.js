//Grab two things from the Sequelize package
const { Model, DataTypes } = require("sequelize");
//bcrypt password hashing
const bcrypt = require("bcrypt");
//Connection we built
const sequelize = require("../config/connection");

//the blueprint, User borrows everything from Model
class User extends Model {
  //setup method to run on data(per user) to check password
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

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
    hooks: {
      //before a new user is saved, blend their password
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //before a user is updated, blend their password
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10,
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false, // don't add createdAt / updatedAt columns
    freezeTableName: true,
    underscored: true, // use comment_text style, not commentText
    modelName: "user",
  },
);
module.exports = User;
