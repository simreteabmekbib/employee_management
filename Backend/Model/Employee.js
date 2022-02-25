const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// List of columns for Employee schema
let Employee = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      format: "%MM-%DD-%YYYY",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "employees",
  }
);

module.exports = mongoose.model("Employee", Employee);
