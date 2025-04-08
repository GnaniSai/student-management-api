import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import Student from "../models/student.js";

const app = express();
app.use(express.json());

await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
console.log("Connection Successful");

app.get("/students", async (req, res) => {
  try {
    const displayStudentDetails = await Student.find()
    res.status(200).json(displayStudentDetails);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const displayStudentDetail = await Student.findById(id);
    if(displayStudentDetail){
        res.status(200).json(displayStudentDetail);
    }else{
        res.status(200).json({message: "id not found",displayStudentDetail});
    }
    
  } catch (error) {
    res.status(404).json({ message: "Details not Found", error });
  }
});

app.post("/students", async (req, res) => {
  const { name, age, department } = req.body;
  try {
    const studentDetails = await Student.create({
      name,
      age,
      department,
    });
    res.status(201).json(studentDetails);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

app.put("/students/:id", async (req, res) => {
  const id = req.params.id;
  const { name, age, department } = req.body;
  try {
    const updateDetails = await Student.findByIdAndUpdate(
      id,
      {
        name,
        age,
        department,
      },
      { new: true }
    );
    if(updateDetails){
        res.status(200).json(updateDetails);
    }else{
        res.status(200).json({message: "id not found",updateDetails});
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

app.delete("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteDetails = await Student.findByIdAndDelete(id);
    if(deleteDetails){
        res.status(200).json({ message: "Deleted successfully", deleteDetails });
    } else{
        res.status(200).json({ message: "id not Found", deleteDetails });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default app;
