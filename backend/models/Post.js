const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  posterUsername: {
    type: String,
    required: true
  },
  claimerUsername: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  furColors: {
    type: Array,
    required: true
  },
  furPattern: {
    type: String,
    required: true
  },
  friendly: {
    type: String,
    required: true
  },
  otherInfo: {
    type: String
  },
  pics: [
    String
  ],
  status: {
    type: String,
    default: "UNCLAIMED"
  },
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true,
      unique: true
    }
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  dateClaimed: {
    type: Date,
    default: null
  },
  dateOfLastStatusChange: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);