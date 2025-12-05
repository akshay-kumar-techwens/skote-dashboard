// const db = require("../config/db");

// const findUserByEmail = async (email) => {
//   const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
//   return result.rows[0];
// };

// const findUserById = async (id) => {
//   const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
//   return result.rows[0];
// };

// const createUser = async (name, email, password, role) => {
//   const result = await db.query(
//     `INSERT INTO users (name, email, password, role)
//      VALUES ($1, $2, $3, $4)
//      RETURNING id, name, email, role`,
//     [name, email, password, role]
//   );
//   return result.rows[0];
// };

// module.exports = {
//   findUserByEmail,
//   createUser,
//   findUserById
// };



const {DataTypes}=require("sequelize");
const sequelize=require("../config/db");

const User=sequelize.define("User",{
  name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  role:{
    type:DataTypes.STRING,
    defaultValue:"user"
  },

})
module.exports=User;








