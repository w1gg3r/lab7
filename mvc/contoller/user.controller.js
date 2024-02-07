const addUser = (req, res, next) => {
    const userData = {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
    };
  
    try {
      // save data to DB
      User.create(userData);
  
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = { addUser };