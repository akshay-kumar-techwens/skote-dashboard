const express = require("express");
const { register, login, logout, getAllUsers, deleteUser, updateUserDetails, getUserById } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/roleMiddleware");
const ROLES = require("../utils/roles");

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", protect, getAllUsers);
router.delete("/users/:id", protect, deleteUser);

// Protected Routes
router.get("/admin",
  protect,
  checkRole(ROLES.SUPER_ADMIN),
  (req, res) => {
    res.json({ message: "Super Admin Access Granted" });
  }
);

router.get("/finance",
  protect,
  checkRole(ROLES.SUPER_ADMIN, ROLES.ACCOUNTANT),
  (req, res) => {
    res.json({ message: "Finance Access Granted" });
  }
);

router.get("/attendance",
  protect,
  checkRole(ROLES.SUPER_ADMIN, ROLES.MANAGER),
  (req, res) => {
    res.json({ message: "Manager Attendance Access" });
  }
);

// Update user (admin only)
router.put('/users/:id', protect, updateUserDetails);

// Get single user
router.get('/users/:id', protect, getUserById);

module.exports = router;
