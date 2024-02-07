const express = require("express");
const { getUser, postUser, deleteUser, putUser } = require("../contoller");
// const { getUser } = require("../contoller");
const router = express.Router();

// /api/user
router.get("/user", getUser);

// /api/user
router.post("/user/:id", postUser);
// .delete("/user/:id", getUser)
router.delete("/user/:id", deleteUser);

router.put("/user/:id", putUser);

module.exports = router;

const express = require("express");

const app = express();
const PORT = 3000;
const userRouter = require("./routes/user.router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes middleware
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log("Server listening on port", PORT));
