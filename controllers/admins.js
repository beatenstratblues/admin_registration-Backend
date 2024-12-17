const { properties, Admins } = require("../models");
const { Op } = require("sequelize");
const { emailValidation, numberValidation } = require("../utilities/admins");

async function getAllAdminsData(req, res) {
  const { uuid } = req.query;

  try {
    if (uuid === "all") {
      const adminData = await Admins.findAll({
        include: [
          {
            model: properties,
          },
        ],
      });

      return res.json({
        admin_data: adminData,
        message: "Data Loaded Successfully",
        status: "Success",
      });
    } else {
      const adminData = await Admins.findAll({
        where: {
          uuid,
        },
        include: [
          {
            model: properties,
          },
        ],
      });

      return res.json({
        admin_data: adminData,
        message: "Data Loaded Successfully",
        status: "Success",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Failure to load admin data",
      status: "Fail",
    });
  }
}

async function handleAdminRegistration(req, res) {
  const { Name, email, contact, assignedProperties } = req.body;

  const emailValidationResult = await emailValidation(email);
  const numValidationResult = await numberValidation(contact);

  
  if(emailValidationResult && emailValidationResult.status==="Error"){ 
    return res.json(emailValidationResult);
  }

  if(numValidationResult && numValidationResult.status==="Error"){ 
    return res.json(numValidationResult);
  }


  let recentlyAddedId;

  try {
    recentlyAddedId = await Admins.create({ Name, email, contact });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Failure to post the data, error in details",
      status: "Fail",
    });
  }

  try {
    await properties.update(
      { admin_id: recentlyAddedId.dataValues.uuid },
      {
        where: {
          name: {
            [Op.in]: assignedProperties,
          },
        },
      }
    );

    return res.json({
      message: "Admin Successfully added",
      status: "Success",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Failure to post the data, error in property selection",
      status: "Fail",
    });
  }
}

async function deletingRegisteredAdmin(req, res) {
  const uuid = req.params.id;

  try {
    await properties.update(
      {
        admin_id: null,
      },
      {
        where: {
          admin_id: uuid,
        },
      }
    );

    await Admins.destroy({   
      where: {
        uuid,
      },
    });

    return res.json({
      message: "Record deleted successfully",
      status: "Success",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Failed to delete the record",
      status: "Fail",
    });
  }
}

async function updateAdminDetails(req, res) {

  const { uuid, Name, email, contact, updatedProperties } = req.body;

  try {
    await Admins.update(
      { Name, email, contact },
      {
        where: {
          uuid,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Failure to update the data, error in details",
      status: "Fail",
    });
  }

  try {
    await properties.update(
      { admin_id: null },
      {
        where: {
          admin_id: uuid,
        },
      }
    );

    await properties.update(
      { admin_id: uuid },
      {
        where: {
          name: {
            [Op.in]: updatedProperties,
          },
        },
      }
    );

    return res.json({
      message: "Admin Successfully Updated",
      status: "Success",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Failure to update the data, error in property selection",
      status: "Fail",
    });
  }
}

async function searchAdmin(req, res) {
  const { searchType, searchQuery } = req.query;

  if(searchType==="byName") {
    try {
      const adminData = await Admins.findAll({
        where: {
          Name: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      });
      return res.json({
        admin_Data: adminData,
        message: "Search Results were found",
        status: "Success",
      });
    } catch (err) {
      return res.json({
        message: "No results found",
        status: "Fail",
      });
    }
  }
  else if(searchType==="byEmail") {
    try {
      const adminData = await Admins.findAll({
        where: {
          email: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      });
      return res.json({
        admin_Data: adminData,
        message: "Search Results were found",
        status: "Success",
      });
    } catch (err) {
      return res.json({
        message: "No results found",
        status: "Fail",
      });
    }
  }
  else if(searchType==="byContact") {
    try {
      const adminData = await Admins.findAll({
        where: {
          contact: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      });
      return res.json({
        admin_Data: adminData,
        message: "Search Results were found",
        status: "Success",
      });
    } catch (err) {
      return res.json({
        message: "No results found",
        status: "Fail",
      });
    }
  }

}


module.exports = {
  getAllAdminsData,
  handleAdminRegistration,
  deletingRegisteredAdmin,
  updateAdminDetails,
  searchAdmin,
};
