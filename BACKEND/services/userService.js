const User= require("../models/userModel");

const findUserByEmail=async(email)=>{
    return await User.findOne({where:{email}});
}
const findUserById=async (id)=>{
    return await User.findByPk(id);
}
const createUser=async(name,email,password,role)=>{
    return await User.create({name,email,password,role})
}

module.exports={
    findUserByEmail,
    createUser,
    findUserById
}
// Tumhara raw SQL service Sequelize me convert