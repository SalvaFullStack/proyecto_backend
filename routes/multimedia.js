const { Router } = require("express");
const multimediaController = require("../controllers/multimedia");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = Router();

router.post("/", auth, admin, multimediaController.create);
router.put("/:multimediaId", auth, admin, multimediaController.update);
router.delete("/:multimediaId", auth, admin, multimediaController.remove);

module.exports = router;
