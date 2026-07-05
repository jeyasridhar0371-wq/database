import axios from "axios"
import { useEffect, useState } from "react"

function Inputpage(props) {

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [course, setCourse] = useState()
    const [selectoption, setSelectoption] = useState()
    var studentlist = props.studentlist
    var setStudentlist = props.setStudentlist
    var newName = props.newName
    var newAge = props.newAge
    var newCourse = props.newCourse
    var newSelectoption = props.newSelectoption
    // setSelectoption(props.newSelectoption)

    function add() {
        // console.log(props.name)
        if (props.name == "Add") {
            axios.post("https://database-backend-cqv5.onrender.com/addstudent", { name: name, age: age, course: course, status: selectoption })
            setStudentlist([...studentlist, { name: name, age: age, course: course, status: selectoption }])
        }else{
            axios.post("https://database-backend-cqv5.onrender.com/updatestudent",{ name: name, age: age, course: course, status: selectoption, oldname:newName })
            // console.log(name)
            
        }
        
    }

    function handlechange(evt) {
        setSelectoption(evt.target.value)
    }

    function handlename(evt) {
        setName(evt.target.value)
    }

    function handleage(evt) {
        setAge(evt.target.value)
    }

    function handlecourse(evt) {
        setCourse(evt.target.value)
    }


    return (
        <div>
            <label htmlFor="name">name</label>
            <input onChange={handlename} type="text" id="name"  /><br />
            <label htmlFor="age">age</label>
            <input onChange={handleage} type="text" id="age"  /><br />
            <label htmlFor="course">course</label>
            <input onChange={handlecourse} type="text" id="course"  /><br />
            <label htmlFor="status">status</label>
            <select name="" id="status" value={selectoption} onChange={handlechange}>
                <option defaultValue="">Select option</option>
                <option value="entrolled">Entrolled</option>
                <option value="completed">Completed</option>
            </select><br />
            <button onClick={()=>{add()}}>{props.name}</button>
        </div>
    )
}

export default Inputpage
