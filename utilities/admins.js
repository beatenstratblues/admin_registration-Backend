const { properties, Admins } = require("../models");
const { Op, where } = require("sequelize");

async function emailValidation(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return {
      message: "wrong_format",
      status: "Error",
    };
  }
  try {
    const emailData = await Admins.findOne({
      where: {
        email
      }
    });

    console.log(emailData);
    if (emailData) {
      return {
        message: "in_use",
        status: "Error",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: "Database_error",
      status: "Error",
    };
  }
}

async function numberValidation(number) {
    console.log(number.length);
    if(number.length>10) {
        return {
            message:"invalid length",
            status:"Error"
        }
    }

    try {
        const numDataResult = await Admins.findOne({
            where: {
                contact : number
            }
        });

        if(numDataResult) {
            return {
                message:"in use",
                status:"Error"
            }
        }
    }
    catch(err) {
        console.log(err);
        return {
            message:"Some error occured",
            status:"Error"
        }
    }

}

module.exports = { emailValidation, numberValidation };
