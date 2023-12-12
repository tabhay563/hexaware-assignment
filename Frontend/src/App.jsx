import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const addUser = async () => {
    const res = await fetch("http://localhost:6900/api/users/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        username,
        phone,
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

  const getData = async () => {
    const response = await fetch("http://localhost:6900/api/users/all");
    console.log(response);
    const data = await response.json();
    setData(data.users);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:6900/api/users/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data, "deleted");
      getData();
    }
  };

  return (
    <>
      <div>
        <h1>User Data Table</h1>
        <div className="btn-css">
          <button
            className="addUserBtn"
            onClick={() => {
              setAddUser(true);
            }}
          >
            Add User
          </button>
        </div>
      </div>
      <div className="">
        <table>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>UserName</th>
            <th>Phone Number</th>
            <th>Company Name</th>
            <th>Joined In</th>
            <th>Action</th>
          </tr>
          {data?.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.phone}</td>
                <td>{item.company}</td>
                <td>{item.createdAt.split("T")[0]}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(item._id);
                    }}
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="form-style">
        <h1>Add User Form</h1>
        <form>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="UserName"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addUser();
            }}
          >
            Add User
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
