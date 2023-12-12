const matchdayController = require("../controllers/matchday");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const { Router } = require("express");

const router = Router();

router.get("/", matchdayController.getAll);
router.get("/:matchdayId", auth, admin, matchdayController.getById);
router.post("/", auth, admin, matchdayController.create);
router.put("/:matchdayId", auth, admin, matchdayController.update);
router.delete("/:matchdayId", auth, admin, matchdayController.remove);

module.exports = router;
