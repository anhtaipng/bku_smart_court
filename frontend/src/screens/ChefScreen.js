import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listChefOrders, } from '../actions/orderActions';

function ChefScreen(props) {
    setTimeout(function () {
        window.location.reload(1);
    }, 10000);
    const orderList = useSelector(state => state.orderList);
    const { orders, loading, error } = orderList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listChefOrders());
    }, [dispatch]);

    const doneHandler = (_id_order) =>{
        axios.put("/api/chef", {_id_order});
        window.location.reload();
    }

    return loading ? <div>Loading...</div> :
        <div className="content content-margined">
            <div className="order-header">
                <h3>Orders</h3>
            </div>
            <div className="order-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>USER</th>
                            <th>DETAILS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (<tr key={order._id_order}>
                            <td>{order._id_order}</td>
                            <td>{order.date}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order._id_user}</td>
                            <td>
                                <div className="dropdown">
                                    <a href="#">Detail</a>
                                    <ul className="dropdown-content">
                                        <li >
                                            {order.orderItems}
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        <td>{<button className="button" onClick={() => doneHandler(order._id_order)}>Done</button>}</td>
                        </tr>))}
                    </tbody>
                </table>

            </div>
        </div>
}
export default ChefScreen;