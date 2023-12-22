const matchdayController = require("../controllers/matchday");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const { Router } = require("express");

const router = Router();

router.get("/", matchdayController.getAllMatchdays);

// router.get("/last", auth, matchdayController.getLastMatchDay);
router.get("/:matchday", auth, matchdayController.getByMatchDay);

router.post("/", auth, admin, matchdayController.saveMatchday);

// router.put("/", auth, admin, matchdayController.update);
// router.put("/close", auth, admin, matchdayController.close);

router.delete("/:matchdayId", auth, admin, matchdayController.remove);

module.exports = router;
