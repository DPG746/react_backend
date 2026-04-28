import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [form, setForm] = useState({
    name:"", email:"", course:"", address:"", mobile:"", dob:""
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value});
  };

  const addStudent = async ()=>{

    console.log(form);-
    console.log("Name:", form.name);
    console.log("Length:", form.name.length);

    // name validation
    if(!form.name || form.name.trim().length < 3){
      alert("Name must be at least 3 characters");
      return;
    }

    //Email verification
    if(!form.email || !form.email.includes("@")){
      alert("Invalid email");
      return;

    }

    if(!form.course){
      alert("Course required");
      return;
    }
    
    if(!form.address){
      alert("Address required");
      return;
    }

    if(!form.mobile){
      alert("Mobile required");
      return;
    }

    if(!form.dob){
      alert("DOB required");
      return;
    }


    await axios.post("http://localhost:3000/add", form);
    getStudents();
  };

  const getStudents = async ()=>{
    const res = await axios.get("http://localhost:3000/all");
    setStudents(res.data);
  };

  const deleteStudent = async(id)=>{
    await axios.delete(`http://localhost:3000/delete/${id}`);
    getStudents();
  };

  useEffect(()=>{
    getStudents();
  },[]);

  return (
    <div className="container">
      <h2>Add Student</h2>

      <input name="name" value={form.name} onChange={handleChange}/>
      <input name="email" value={form.email} onChange={handleChange}/>
      <input name="course" value={form.course} onChange={handleChange}/>
      <input name="address" value={form.address} onChange={handleChange}/>
      <input name="mobile" value={form.mobile} onChange={handleChange}/>
      <input name="dob" value={form.dob} onChange={handleChange}/>

      <button onClick={addStudent}>Add</button>

      <h2>Students</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map(s=>(
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={()=>deleteStudent(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
