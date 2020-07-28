import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from "../actions/userActions";
import axios from "axios";

//Order info -> generate report
import { listOrders, } from '../actions/orderActions';

// import Wijmo styles and components
import "wijmo/styles/wijmo.css";
import { CollectionView } from "wijmo/wijmo";
import { FlexGrid } from "wijmo/wijmo.react.grid";
import { FlexChart, FlexChartSeries } from "wijmo/wijmo.react.chart";

// apply Wijmo license key
import { setLicenseKey } from "wijmo/wijmo";
setLicenseKey("your key goes here");

function ManagerScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;
  const [vendor, setVendor] = useState("");
  const [data, setData] = useState([]);

  const testGraph = [
    {
      name: "VietNam",
      price: 12000,
      expenses: Math.random() * 5000,
      downloads: Math.round(Math.random() * 20000),
    },
    {
      name: "USA",
      price: 12000,
      expenses: Math.random() * 5000,
      downloads: Math.round(Math.random() * 20000),
    }, {
      name: "China",
      price: 12000,
      expenses: Math.random() * 5000,
      downloads: Math.round(Math.random() * 20000),
    }, {
      name: "Korea",
      price: 12000,
      expenses: Math.random() * 5000,
      downloads: Math.round(Math.random() * 20000),
    }, {
      name: "Australia",
      price: 12000,
      expenses: Math.random() * 5000,
      downloads: Math.round(Math.random() * 20000),
    },
  ];
  const total =testGraph.reduce((prev,cur)=>prev+cur.price,0);
  var finalRow={
    name: 'Total',
    price: total,
    expenses: 0,
    downloads: 0,
  }
 
  testGraph.push(finalRow);


  const dispatch = useDispatch();
  //http://localhost:5000/api/users

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listOrders(vendor));
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
  // const temp=users;

  const vendorSet = [
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
      // {/* ))} */}
    ],
    //xử lý hiện thị thông tin order ở đây: VENDOR1

    [
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title">Welcome to React and Wijmo</h1>
        </header> */}
        <p className="App-intro">
          Hello, Hello. This is report from vendor 1
        </p>
        <div className="App-panel">
          <FlexGrid itemsSource={testGraph} />
          <FlexChart itemsSource={testGraph} bindingX="country">
            <FlexChartSeries name="Sales" binding="sales" />
            <FlexChartSeries name="Expenses" binding="expenses" />
            <FlexChartSeries name="Downloads" binding="downloads" />
          </FlexChart>
        </div>
      </div>
    ],

    //xử lý hiện thị thông tin order ở đây: VENDOR2

    [<h1>Nothing here 2</h1>],
  ];

  const [toggle, setToggle] = useState("");

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content content-margined">
      <div className="order-header">
        <nav>
          <ul>
            <li>
              <a key={vendorSet} onClick={() => setToggle(vendorSet[0])}>
                User Information
              </a>
            </li>
            <li>
              <div className="dropdown">
                <a href="#"> Report </a>{" "}
                <ul className="dropdown-content">
                  <li>
                    <a key={vendorSet} onClick={() => setToggle(vendorSet[1])}>
                      Vendor 1
                    </a>
                  </li>
                  <li>
                    <a key={vendorSet} onClick={() => setToggle(vendorSet[2])}>
                      Vendor 2
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {/* Display infor when click */}
      <div>
        {toggle}
        {/* <p>{toggle}</p> */}
      </div>
    </div>
  );
  }
export default ManagerScreen;
