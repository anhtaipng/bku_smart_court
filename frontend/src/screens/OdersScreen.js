import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { orders, loading, error } = orderList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

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
              <th>DETAIL</th>
              <th>STATUS</th>
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
              <td>{order.isDone?order.isReceived?"Done":"Customer doesn't have taken food yet!":"The food is not ready"}</td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;