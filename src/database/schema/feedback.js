const mongoose = require("../config/dbConfig");
const Schema = mongoose.Schema;
const feedback_schema = new Schema(
  {

    firstname: {
      desc: "The user's first name.",
      trim: true,
      type: String,
      required: true,
    },
    lastname: {
      desc: "The user's second name.",
      trim: true,
      type: String,
      required: true,
    },
    telnum: {
        desc: "user's telephone'",
        trim: true,
        type: Number,
        select: false,
    },
    email: {
        desc: "The user's email address.",
        trim: true,
        type: String,
        unique: false,
        required: true,
      },
    agree: {
      desc: "is agree to be contacted",
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      desc: "Tel.",
      type: Boolean,
      default: false,
      required: true,
    },
    message: {
        desc: "message to be send",
        trim: true,
        type: String,
        required: true
      }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const Feedback = mongoose.model("Feedbacks", feedback_schema);
