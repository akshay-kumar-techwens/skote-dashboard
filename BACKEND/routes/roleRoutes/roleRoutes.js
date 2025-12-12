const express = require("express");
const router = express.Router();
const {
  createRole,
  getAllRoles,
  updateRole,
  deleteRole
} = require("../../controllers/roleController");

router.post("/create", createRole);
router.get("/all", getAllRoles);
router.put("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);

module.exports = router;
