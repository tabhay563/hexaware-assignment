import React ,{ useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {

  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [uname, setUname] = useState("");
  const [uemail, setUemail] = useState("");
  const [ucompany, setUcompany] = useState("");
  const [editId, setEditId] = useState(null);
  
  const getData = async () => {
    const response = await fetch("http://localhost:3000/api/users/all");
    const data = await response.json();
    console.log(data.users,'usersdata');
    setData(data.users);
  };

  useEffect(() => {
    getData();
  }, []);


  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/users/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        company,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data, "added");
      getData();
    }
  };



  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data, "deleted");
      getData();
    }
  };

  const handleEdit = async (id) => {
    axios.get(`http://localhost:3000/api/users/${id}`)
    .then(res => {
      setUname(res.data.name);
      setUemail(res.data.email);
      setUcompany(res.data.company);
    }).catch(err => console.log(err));
    setEditId(id);
  }


  const handleUpdate = async () => {
    axios.put(`http://localhost:3000/api/users/${editId}`, {
      name : uname,
      email : uemail,
      company : ucompany,
    })
    .then(res => {
      console.log(res);
      location.reload();
      setEditId(-1);
    }).catch(err => console.log(err));
    }
  
  return (
    <>

      <div>
        <h1>User Data Table</h1>
      </div>
      <div className="">
        <table>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company Name</th>
            <th>Action</th>
          </tr>
          {data && data?.map((item, index) => {
      
            return (
              item._id === editId ? 
              <tr> 
                <td>{item._id}</td>
                <td><input type="text" value={uname} onChange={e => setUname(e.target.value)}/></td>
                <td><input type="text" value={uemail} onChange={e => setUemail(e.target.value)}/></td>
                <td><input type="text" value={ucompany} onChange={e => setUcompany(e.target.value)}/></td>
                <td><button onClick={handleUpdate}>Update</button></td>
              </tr> 
              :
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.company}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(item._id);
                    }}
                    >
                    Delete User
                  </button>
                  <button onClick={() => handleEdit(item._id)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="form-style">
        <h1>Add User Form</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
          <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
          <input type="text" placeholder="Company Name" onChange={(e) => {setCompany(e.target.value)}}/>
          <button>Add User</button>
        </form>
      </div>
      
    </>
  );
}

export default App;
