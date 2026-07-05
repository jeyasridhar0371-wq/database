const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/studentDB").then(()=>{
    console.log("mongodb connected...")
}).catch(()=>{
    console.log("mongodb not connected...")
})

const Student = mongoose.model("Students",{
    name:String,
    age:String,
    course:String,
    status:String
},"students")

app.get("/data",(req,res)=>{
    Student.find().then((retdata)=>{
        res.send(retdata)
        // console.log(retdata)
    })
})

app.post("/addstudent",(req,res)=>{
    const newStudent = new Student(req.body)
    // console.log(req.body)
    newStudent.save().then(()=>{console.log("Saved Successfully...")})
    .catch(()=>{console.log("Some error occured")})
})

app.post("/updatestudent",(req,res)=>{
    // console.log(req.body.oldname)
    Student.updateOne({name:req.body.oldname},{$set:{name:req.body.name,age:req.body.age,course:req.body.course,status:req.body.status}}).then(()=>{
        console.log("update success...")
    }).catch(()=>{
        console.log("update fail...")
    })
})

app.post("/deletestudent",(req,res)=>{
    console.log(req.body)
    Student.deleteOne(req.body).then(()=>{console.log("deleted success...")})
    .catch(()=>{console.log("delete fail...")})
    // res.send(Student)
    
})



app.listen(3000,function(){
    console.log("Server Started...")
})