import { useEffect, useState } from "react"
import axios from "axios"
import Inputpage from "./Inputpage"


function App() {


  const [studentlist, setStudentlist] = useState([])
  const [renupdate,setRenupdate] = useState(false)
  const [newName,setnewName] = useState()
  const [newAge,setnewAge] = useState()
  const [newCourse,setnewCourse] = useState()
  const [newSelectoption,setnewSelectoption] = useState()

  useEffect(function () {
    axios.get("http://localhost:3000/data").then((data) => {
      setStudentlist(data.data)
      console.log(studentlist)
    })
  }, [])  

  function update(evt, callback){
    setnewName(evt.target.parentElement.parentElement.children[0].textContent)
    setnewAge(evt.target.parentElement.parentElement.children[1].textContent)
    setnewCourse(evt.target.parentElement.parentElement.children[2].textContent)
    setnewSelectoption(evt.target.parentElement.parentElement.children[3].textContent)
    axios.post("http://localhost:3000/updatestudent",{name:newName,age:newAge,course:newCourse,status:newSelectoption})
    
    callback()
  }

  function callback(){
    setRenupdate(true)
    console.log("this is callbavk function")
  }

  function handledelete(evt){
    
    let newName = evt.target.parentElement.parentElement.children[0].textContent
    let newAge = evt.target.parentElement.parentElement.children[1].textContent
    let newCourse = evt.target.parentElement.parentElement.children[2].textContent
    let newSelectoption = evt.target.parentElement.parentElement.children[3].textContent
    axios.post("http://localhost:3000/deletestudent",{name:newName,age:newAge,course:newCourse,status:newSelectoption})
  }


  return (
    <div>
      <Inputpage studentlist={studentlist} setStudentlist={setStudentlist} name="Add"/>
      
      {
        studentlist.map(function (item, index) {
          return (
            <div key={index} style={{ display: "flex", gap: 20,alignItems:"center" }}>
              <h1>{item.name}</h1>
              <h1>{item.age}</h1>
              <h1>{item.course}</h1>
              <h1>{item.status}</h1>
              <div>
                <button onClick={(evt)=>{update(evt,callback)}}>update</button>
                <button onClick={handledelete}>delete</button>
              </div>
            </div>
          )
        })
      }
      {
        renupdate?(<Inputpage name="Update" newName={newName} newAge={newAge} newCourse={newCourse} newSelectoption={newSelectoption} />):("")
      }
      
    </div>
  )
}

export default App
