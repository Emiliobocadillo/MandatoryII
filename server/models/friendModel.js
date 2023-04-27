const mongoose = require("mongoose");

const friendSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the friends name"],
    },
    email: {
      type: String,
      required: [true, "Please add the friends email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the friends phone number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friend", friendSchema);