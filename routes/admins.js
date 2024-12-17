const express = require("express");
const { properties, Admins } = require("../models");
const { Op } = require("sequelize");
const { getAllAdminsData, handleAdminRegistration, deletingRegisteredAdmin, updateAdminDetails, searchAdmin } = require("../controllers/admins");

const adminRouter = express.Router();

adminRouter.post("/", handleAdminRegistration);

adminRouter.get("/", getAllAdminsData);

adminRouter.delete("/:id", deletingRegisteredAdmin);

adminRouter.put("/:id", updateAdminDetails);

adminRouter.get("/search",searchAdmin);

module.exports = adminRouter;
