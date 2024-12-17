const { properties, Admins } = require("../models");
const { Op } = require("sequelize");

async function fetchPropertyData(req, res) {
  try {
    if (req.params.fetchType === "all") {
      const Properties_data = await properties.findAll();
      return res.json({
        properties_data: Properties_data,
        message: "Data fetched successfully",
        status: "Success",
      });
    } else if (req.params.fetchType === "unadmin") {
      const Properties_data = await properties.findAll({
        where: {
          admin_id: null,
        },
      });
      return res.json({
        properties_data: Properties_data,
        message: "Data fetched successfully",
        status: "Success",
      });
    }
  } catch (err) {
    console.log(err);
    return (
      res.status(400).json({
        message: "Failure to fetch the data",
        status: "Fail",
      })
    );
  }
}

module.exports = { fetchPropertyData };
