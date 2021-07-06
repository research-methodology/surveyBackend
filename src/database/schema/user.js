const mongoose = require("../config/dbConfig");
const Schema = mongoose.Schema;
const user_schema = new Schema(
  {
    email: {
      desc: "The user's email address.",
      trim: true,
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      desc: "user password",
      trim: true,
      type: String,
      required: true,
      select: false,
    },
    first_name: {
      desc: "The user's first name.",
      trim: true,
      type: String,
      required: true,
    },
    last_name: {
      desc: "The user's second name.",
      trim: true,
      type: String,
      required: true,
    },
    isLoggedIn: {
      desc: "is Active.",
      type: Boolean,
      default: false,
      required: true,
    },
    isConfirmed: {
      desc: "is Active.",
      type: Boolean,
      default: false,
      required: true,
    }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const User = mongoose.model("Users", user_schema);