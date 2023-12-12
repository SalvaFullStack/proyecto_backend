const { Router } = require("express");
const teamController = require("../controllers/teams");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = Router();

router.get("/", teamController.getAll);
router.get("/:teamId", teamController.getById);

router.post(
  "/",
  auth,
  admin,

  teamController.create
);
router.put(
  "/:teamId",
  auth,
  admin,

  teamController.update
);
router.delete("/:teamId", auth, admin, teamController.remove);

module.exports = router;
