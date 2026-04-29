import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [form, setForm] = useState({
    name:"", email:"", course:"", address:"", mobile:"", dob:""
  });

  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value});
  };

  // ADD / UPDATE
  const addStudent = async ()=>{

    // VALIDATION
    if(!form.name || form.name.trim().length < 3){
      alert("Name must be at least 3 characters");
      return;
    }

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

    // UPDATE
    if(editId){
      await axios.put(`http://localhost:3000/update/${editId}`, form);
      setEditId(null);
    }
    // ADD
    else{
      await axios.post("http://localhost:3000/add", form);
    }

    getStudents();

    // clear form
    setForm({
      name:"", email:"", course:"", address:"", mobile:"", dob:""
    });
  };

  // GET
  const getStudents = async ()=>{
    const res = await axios.get("http://localhost:3000/all");
    setStudents(res.data);
  };

  // DELETE
  const deleteStudent = async(id)=>{
    await axios.delete(`http://localhost:3000/delete/${id}`);
    getStudents();
  };

  // EDIT
  const editStudent = (student)=>{
    setForm(student);
    setEditId(student._id);
  };

  useEffect(()=>{
    getStudents();
  },[]);

  return (
    <div className="container mt-3">

      <h3>Add / Update Student</h3>

      {/* FORM */}
      <input className="form-control mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange}/>
      <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
      <input className="form-control mb-2" name="course" placeholder="Course" value={form.course} onChange={handleChange}/>
      <input className="form-control mb-2" name="address" placeholder="Address" value={form.address} onChange={handleChange}/>
      <input className="form-control mb-2" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange}/>
      <input className="form-control mb-2" type="date" name="dob" value={form.dob} onChange={handleChange}/>

      <button className="btn btn-primary mt-2" onClick={addStudent}>
        {editId ? "Update" : "Add"}
      </button>

      {/* TABLE */}
      <h3 className="mt-4">Students</h3>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map(s=>(
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{s.mobile}</td>
              <td>{s.address}</td>
              <td>{s.DOB}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={()=>editStudent(s)}>Edit</button>
                <button className="btn btn-danger" onClick={()=>deleteStudent(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
