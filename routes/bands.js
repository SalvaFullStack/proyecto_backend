const { Router } = require("express");
const bandController = require("../controllers/bands");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = Router();

router.get("/", bandController.getAll);
router.get("/:bandId", bandController.getById);

router.post(
  "/",
  auth,
  admin,

  bandController.create
);
router.put(
  "/:bandId",
  auth,
  admin,

  bandController.update
);
router.delete("/:bandId", auth, admin, bandController.remove);

module.exports = router;
