const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { userDataValidate } = require("../validations/user.validation");

router.post("/", userDataValidate, UserController.addUser);

module.exports = router;

const { body } = require("express-validator");

router.post("/", userDataValidateChainMethod, UserController.addUser);

const userDataValidateChainMethod = [
  body("userName")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
  body("email").optional().isEmail().withMessage("Provide valid email"),
  body("gender")
    .optional()
    .isString()
    .withMessage("Gender should be string")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender value is invalid"),
  body("dateOfBirth")
    .optional()
    .isDate()
    .withMessage("DOB should be valid date"),
  body("phoneNumber")
    .optional()
    .isString()
    .withMessage("phone number should be string")
    .custom((value) => {
      if (value.length !== 10) {
        return Promise.reject("Phone number should be 10 digits");
      } else {
        return true;
      }
    }),
];



const { validationResult } = require("express-validator");

const addUser = (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // save data to DB
    User.create(req.body);

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { addUser };


router.post(
    "/schama-based",
    checkSchema(userDataValidateSchemaBased),
    UserController.addUser
  );