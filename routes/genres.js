const genreController = require("../controllers/genres");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const { Router } = require("express");

const router = Router();

router.get("/", genreController.getAll);
router.get("/:genreId", auth, admin, genreController.getById);
router.post("/", auth, admin, genreController.create);
router.put("/:genreId", auth, admin, genreController.update);
router.delete("/:genreId", auth, admin, genreController.remove);

module.exports = router;
