  const userDataValidate = (req, res, next) => {
    if (!req.body.userName) {
      throw Error("username is required");
    }
    if (!req.body.password) {
      throw Error("password is required");
    }
    if (req.body.password.length < 5) {
      throw Error("password should have atleast 5 characters");
    }
    if (!isValidEmail()) {
      throw Error("provide valid email");
    }
    // .... and so on
  };
  
  module.exports = { userDataValidate };

  const userDataValidateSchemaBased = checkSchema({
    userName: {
      exists: {
        errorMessage: "User name is required",
        options: { checkFalsy: true },
      },
      isString: { errorMessage: "User name should be string" },
    },
    password: {
      exists: { errorMessage: "Password is required" },
      isString: { errorMessage: "password should be string" },
      isLength: {
        options: { min: 5 },
        errorMessage: "Password should be at least 5 characters",
      },
    },
    email: {
      isEmail: { errorMessage: "Please provide valid email" },
    },
    gender: {
      isString: { errorMessage: "Gender should be string" },
      isIn: {
        options: [["Male", "Female", "Other"]],
        errorMessage: "Gender is invalid",
      },
    },
    dateOfBirth: {
      isDate: { errorMessage: "DOB should be string" },
    },
    phoneNumber: {
      isString: { errorMessage: "phone number should be string" },
      options: (value) => {
        value.length === 10;
      },
      errorMessage: "Phone number should be 10 digits",
    },
  });