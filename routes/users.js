const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const userController = require("../controllers/user");
const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const router = Router();

// Añadir auth, admin
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/profile", auth, userController.getProfile);

// Añadir auth,
router.get("/teams", auth, userController.getAllTeams);

// Añadir auth, admin
router.get("/teams/:teamId", auth, admin, userController.getOneTeam);

// Añadir auth
router.get("/team/:teamId", auth, userController.getOneTeam);

router.post("/login", async (req, res) => {
  const { username, password: passwordPlainText } = req.body;

  const user = await User.findOne({ username });

  if (!user)
    return res.status(400).json({ msg: "Usuario o contraseña incorrecto" });

  const isValidUser = await bcrypt.compare(passwordPlainText, user.password);

  if (!isValidUser)
    return res.status(400).json({ msg: "Usuario o contraseña incorrecto" });

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, username: user.username },
    process.env.privateKey
  );

  res.setHeader("x-auth-token", token);
  res.setHeader("Access-Control-Expose-Headers", "x-auth-token");
  res.json({ msg: "Usuario logueado" });
});

router.post(
  "/register",
  body("email").custom(async (email) => {
    const user = await User.findOne({ email });

    if (user) throw new Error("Vuelve a intentarlo más tarde");
  }),
  async (req, res) => {
    const {
      username,
      password: passwordPlainText,
      isAdmin,
      ...rest
    } = req.body;

    const user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ msg: "Vuelve a intentarlo más tarde" });

    const { errors } = validationResult(req);

    if (errors.length)
      return res.status(400).send({ msg: "Vuelve a intentarlo más tarde" });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(passwordPlainText, salt);

    const newUser = await User.create({ username, password, ...rest });

    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin, username: newUser.username },
      process.env.privateKey
    );

    res.setHeader("x-auth-token", token);
    res.setHeader("Access-Control-Expose-Headers", "x-auth-token");
    res.json({ msg: "Usuario registrado" });
  }
);

router.post("/teams", auth, admin, userController.createTeam);

router.put("/teams/:teamId", auth, admin, userController.updateTeam);

router.delete("/:userId", auth, admin, userController.deletePlayer);

router.delete("/teams/:teamId", auth, admin, userController.deleteTeam);

router.post("/matchday", auth, admin, userController.createMatchDay);

router.put("/teams/:teamId", auth, admin, userController.assignUserToTeam);

module.exports = router;
