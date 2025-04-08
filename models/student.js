import mongoose from "mongoose";
const { Schema } = mongoose;

const Students = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  department: String,
  admissionDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Students", Students);
