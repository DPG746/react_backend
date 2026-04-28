// Importing required modules
const express = require("express");
const mongoose=require("mongoose");
const cors = require("cors");

const app=express();
app.use(cors());
app.use(express.json());

//Connecting to MongoDB
mongoose.connect("mongodb://localhost:27017/studentdb").then(()=> console.log("DB Connected")).catch(err => console.log(err));


//Create Student Model

const Student = mongoose.model("Student",{
    name: String,
    email: String,
    course: String,
    address: String,
    mobile: String,
    dob: String
});

//API to add a student
app.post("/add",async(req,res)=>{
    const s = new Student(req.body);
    await s.save();
    res.send("Added");
});

//API to get all students
app.get("/all",async(req,res)=>{
    const data = await Student.find();
    res.json(data);
})

//API to delete a student
app.delete("/delete/:id",async(req,res)=>{
    await Student.findByIdAndDelete(req.params.id);
    res.send("Deleted");
})

// UPDATE
app.put("/update/:id", async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,     // which record
        req.body,          // new data
        { new: true }      // return updated data
      );
  
      res.json(updatedStudent);
    } catch (err) {
      res.status(500).send("Error updating student");
    }
  });

app.listen(3000,()=> console.log("Server running"));
