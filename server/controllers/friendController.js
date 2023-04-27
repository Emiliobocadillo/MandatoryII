const asyncHandler = require("express-async-handler");
const Friend = require("../models/friendModel");

//@dexc Get all friends
//@route GET /api/friends
//@access private
const getFriends = asyncHandler(async (req, res) => {
  const friends = await Friend.find({ user_id: req.user.id });
  res.status(200).json(friends);
});

//@dexc Create new friend
//@route POST /api/friends
//@access private
const createFriend = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const friend = await Friend.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(friend);
});

//@dexc get friend
//@route GET /api/friends/:id
//@access private
const getFriend = asyncHandler(async (req, res) => {
  const friend = await Friend.findById(req.params.id);
  if (!friend) {
    res.status(404);
    throw new Error("Friend not found");
  }
  res.status(200).json(friend);
});

//@dexc Update friend
//@route PUT /api/friends/:id
//@access private
const updateFriend = asyncHandler(async (req, res) => {
  const friend = await Friend.findById(req.params.id);
  if (!friend) {
    res.status(404);
    throw new Error("Friend not found");
  }

  if (friend.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other users friends");
  }

  const updatedFriend = await Friend.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedFriend);
});

//@dexc Delete friend
//@route DELETE /api/friends/:id
//@access private
const deleteFriend = asyncHandler(async (req, res) => {
  const friend = await Friend.findById(req.params.id);
  if (!friend) {
    res.status(404);
    throw new Error("Friend not found");
  }

  if (friend.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other users friends");
  }

  await Friend.deleteOne({ _id: req.params.id });
  res.status(200).json(friend);
});

module.exports = {
  getFriends,
  createFriend,
  getFriend,
  updateFriend,
  deleteFriend,
};