import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Cookie from 'js-cookie';


import { useSelector, useDispatch,  } from 'react-redux';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OdersScreen';
import ChefScreen from './screens/ChefScreen';
import ITstaffScreen from './screens/ITstaffScreen';
import VendorScreen from './screens/VendorScreen';
import ManagerScreen from './screens/ManagerScreen';

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const vendorList = useSelector(state => state.vendorList);
  const { vendors, loading, error } = vendorList;

  const selectVendorHandler = (vendor_name) =>{
    Cookie.set("vendor_name", vendor_name);
  }

  const openMenu = async () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
             </button>
            <Link to="/">BKU Food Court</Link>
          </div>
          <div className="header-links">
            <Link to='/cart'>
              <img src='../images/cart.png' alt="Cart" width="34" height="30" />
              {cartItems.reduce((a, c) => a += c.qty, null)}
            </Link>
            {
              userInfo ? <Link to="/profile" >{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }
            {userInfo && userInfo.isManager &&
              <Link to="/manager">Manager</Link>
              || ''}
            {userInfo && userInfo.isAdmin &&
              <div className="dropdown">
                <a href="#">Vendor Owner</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
              || ''
            }
            {userInfo && userInfo.isChef &&
              <Link to="/chef">Chef</Link>
              || ''}
            {userInfo && userInfo.isITstaff &&
              <Link to="/itstaff">IT Staff</Link>
              || ''}
          </div>
        </header>
        <aside className="sidebar">
          <h3 className="item">Vendors</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          {loading ? (<div>...LOADING...</div>) :(<ul>
              {vendors.map(vendor =>
                <li key={vendor._id}>
                  <Link to={"/vendor/"+vendor.name} onClick={() => selectVendorHandler(vendor.name)} className="item item-btn">{vendor.name}</Link>
                </li>
              )}
            </ul>)
          }
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/products/" component={ProductsScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/vendor/:id" component={VendorScreen} />
            <Route path="/chef" component={ChefScreen} />
            <Route path="/manager" component={ManagerScreen} />
            <Route path="/itstaff" component={ITstaffScreen} />
          </div>
        </main>
        <footer className="footer">
          S4T
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;