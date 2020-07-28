import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from "../actions/userActions";
import axios from "axios";
import { render } from "react-dom";

function ITstaffScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;
  const [vendor, setVendor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const deleteManagerHandler = (_id) => {
    axios.put("/api/users/deletemanager", { _id });
    window.location.reload();
  };

  const deleteChefHandler = (_id) => {
    axios.put("/api/users/deletechef", { _id });
    window.location.reload();
  };

  const addManagerHandler = (_id) => {
    axios.put("/api/users/addmanager", { _id, vendor });
    window.location.reload();
  };

  const addChefHandler = (_id) => {
    axios.put("/api/users/addchef", { _id, vendor });
    window.location.reload();
  };

  const prof = [
    [
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>isMANAGE</th>
              <th>isCHEF</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
             {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    "Yes: " + user.vendor
                  ) : (
                    <input
                      placeholder="Enter vendor you want to add this user"
                      size="27"
                      onChange={(e) => setVendor(e.target.value)}
                    ></input>
                  )}
                </td>
                <td>
                  {user.isChef ? (
                    "Yes: " + user.vendor
                  ) : (
                    <input
                      placeholder="Enter vendor you want to add this user"
                      size="27"
                      onChange={(e) => setVendor(e.target.value)}
                    ></input>
                  )}
                </td>
                <td>
                  {user.isAdmin && user.isChef ? (
                    <div>
                      <button
                        className="button"
                        onClick={() => deleteManagerHandler(user._id)}
                      >
                        deleteManager
                      </button>
                      <button
                        className="button"
                        onClick={() => deleteChefHandler(user._id)}
                      >
                        deleteChef
                      </button>
                    </div>
                  ) : user.isAdmin && !user.isChef ? (
                    <div>
                      <button
                        className="button"
                        onClick={() => deleteManagerHandler(user._id)}
                      >
                        deleteManager
                      </button>
                      <button
                        className="button"
                        onClick={() => addChefHandler(user._id)}
                      >
                        addChef
                      </button>
                    </div>
                  ) : !user.isAdmin && user.isChef ? (
                    <div>
                      <button
                        className="button"
                        onClick={() => addManagerHandler(user._id)}
                      >
                        addManager
                      </button>
                      <button
                        className="button"
                        onClick={() => deleteChefHandler(user._id)}
                      >
                        deleteChef
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="button"
                        onClick={() => addManagerHandler(user._id)}
                      >
                        addManager
                      </button>
                      <button
                        className="button"
                        onClick={() => addChefHandler(user._id)}
                      >
                        addChef
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>,
    ],
    [],
  ];
  const [toggle, setToggle] = useState("");

  return loading ? (
    <div>Loading...</div>
  ) : (
    
    <div>
     

<div>
      
        <nav>
          <ul>
            <li>
              <a key={prof} onClick={() => setToggle(prof)}>
                User Information
              </a>
            </li>
            <li>
              <a href="#"> Maintenance Mode </a>{" "}
              <ul>
                <li>
                  <label className="switch">
                    <input type="checkbox" />
                    <div className="switch-btn"> </div>{" "}
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p>{toggle}</p>
        <p>{toggle === "police" 
        && "this is police"}</p>
      </div>
     
    </div>
  );
}


export default ITstaffScreen;
