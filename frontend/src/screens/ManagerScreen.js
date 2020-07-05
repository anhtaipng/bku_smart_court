import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers, } from '../actions/userActions';
import axios from 'axios';

function ManagerScreen(props) {
    const userList = useSelector(state => state.userList);
    const { users, loading, error } = userList;
    const [vendor,setVendor] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);


    const deleteManagerHandler = (_id) =>{
        axios.put("/api/users/deletemanager", {_id});
        window.location.reload();
    }

    const deleteChefHandler = (_id) =>{
        axios.put("/api/users/deletechef", {_id});
        window.location.reload();
    }

    const addManagerHandler = (_id) =>{
        axios.put("/api/users/addmanager", {_id, vendor});
        window.location.reload();
    }

    const addChefHandler = (_id) =>{
        axios.put("/api/users/addchef", {_id, vendor});
        window.location.reload();
    }


    return loading ? <div>Loading...</div> :
        <div className="content content-margined">
            <div className="order-header">
                <h3>USER</h3>
            </div>
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
                        {users.map(user => (<tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin?("Yes: "+ user.vendor):<input placeholder="Enter vendor you want to add this user" size = "27" 
                            onChange={(e) => setVendor(e.target.value)}></input>}</td>
                            <td>{user.isChef?("Yes: "+ user.vendor):<input placeholder="Enter vendor you want to add this user" size = "27"
                            onChange={(e) => setVendor(e.target.value)}></input>}</td>
                            <td>{(user.isAdmin && user.isChef) ?
                                <div><button className="button" onClick={() => deleteManagerHandler(user._id)}>deleteManager</button>
                                    <button className="button" onClick={() => deleteChefHandler(user._id)}>deleteChef</button></div>
                                : (user.isAdmin && !user.isChef) ?
                                    <div><button className="button" onClick={() => deleteManagerHandler(user._id)}>deleteManager</button>
                                        <button className="button" onClick={() => addChefHandler(user._id)}>addChef</button></div>
                                    : (!user.isAdmin && user.isChef) ?
                                    <div><button className="button" onClick={() => addManagerHandler(user._id)}>addManager</button>  
                                        <button className="button" onClick={() => deleteChefHandler(user._id)}>deleteChef</button></div>
                                        :<div><button className="button" onClick={() => addManagerHandler(user._id)}>addManager</button>
                                        <button className="button" onClick={() => addChefHandler(user._id)}>addChef</button></div>
                            }

                            </td>

                        </tr>))}
                    </tbody>
                </table>

            </div>
        </div>

}

export default ManagerScreen;