const express = require("express");
const { properties, Admins } = require("../models");
const { Op } = require("sequelize");
const { fetchPropertyData } = require("../controllers/properties");

const propertyRouter = express.Router();

propertyRouter.get("/:fetchType", fetchPropertyData);

module.exports = propertyRouter;