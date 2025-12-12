const { User } = require("../models");

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
}
const findUserById = async (id) => {
    return await User.findByPk(id);
}
const findAllUsers = async () => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] }
    });
    console.log("findAllUsers found:", users.length, "users");
    return users;
}
const createUser = async (name, email, password, role) => {
    return await User.create({ name, email, password, role })
}
const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return await user.destroy();
}

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
    findAllUsers,
    deleteUser
}
// Tumhara raw SQL service Sequelize me convert