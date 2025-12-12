const { Role } = require("../models");

// CREATE ROLE
exports.createRole = async (req, res) => {
  try {
    const { roleName, rolePermissions } = req.body;

    if (!roleName)
      return res.status(400).json({ message: "Role name required" });

    const exists = await Role.findOne({ where: { roleName } });
    if (exists)
      return res.status(400).json({ message: "Role already exists" });

    const role = await Role.create({
      roleName,
      rolePermissions: rolePermissions || []
    });

    res.status(201).json({ message: "Role created", role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL ROLES
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json({ roles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE ROLE PERMISSIONS / NAME
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName, rolePermissions } = req.body;

    const role = await Role.findByPk(id);
    if (!role)
      return res.status(404).json({ message: "Role not found" });

    role.roleName = roleName || role.roleName;
    role.rolePermissions = rolePermissions || role.rolePermissions;

    await role.save();

    res.json({ message: "Role updated", role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ROLE
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);
    if (!role)
      return res.status(404).json({ message: "Role not found" });

    await role.destroy();

    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
