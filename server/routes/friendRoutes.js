const express = require("express");
const router = express.Router();
const {
  getFriends,
  createFriend,
  getFriend,
  updateFriend,
  deleteFriend,
} = require("../controllers/friendController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getFriends);
router.route("/").post(createFriend);
router.route("/:id").get(getFriend);
router.route("/:id").put(updateFriend);
router.route("/:id").delete(deleteFriend);

module.exports = router;
