const { Router } = require("express");
const teamController = require("../controllers/teams");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = Router();

router.get("/", auth, admin, teamController.getAll);
router.get("/:teamId", teamController.getById);

router.post(
  "/",

  teamController.create
);

router.put(
  "/:teamId",

  auth,
  admin,
  teamController.update
);

router.delete("/:teamId", auth, admin, teamController.remove);

router.put(
  "/api/teams/:teamId/removePlayer/:playerId",
  auth,
  admin,
  teamController.removePlayerFromTeam
);

module.exports = router;
