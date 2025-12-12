const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser, findAllUsers, deleteUser } = require("../services/userService");
const ROLES = require("../utils/roles");
const { Role } = require("../models");

const { where } = require("sequelize");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exist = await findUserByEmail(email);
    if (exist)
      return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hash, role || ROLES.MANAGER);

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ─────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false
    });

    // 1️⃣ Find Role by roleName string
    const userRole = await Role.findOne({
      where: { roleName: user.role }
    });

    // If no role found, return empty perms
    const permissions = userRole ? userRole.rolePermissions : [];

    // 2️⃣ Response
    res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      permissions
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,   // Same as login
      sameSite: "lax", // recommended for localhost
      path: "/"        // Required for cookie removal
    });

    res.status(200).json({ message: "Logout successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    console.log("GET /users called");
    const users = await findAllUsers();
    console.log("Sending users:", users.length);
    res.json(users);
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};