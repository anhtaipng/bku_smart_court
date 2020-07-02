import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import { useSelector, useDispatch } from 'react-redux';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OdersScreen';
import ChefScreen from './screens/ChefScreen';
function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const openMenu = () => {
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
            {userInfo && userInfo.isAdmin && 
              <div className="dropdown">
                <a href="#">Manager</a>
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
          </div>
        </header>
        <aside className="sidebar">
          <h3 className="item">Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <Link to="/category/Food" className="item item-btn">Food</Link>
          <Link to="/category/Drinks" className="item item-btn">Drinks</Link>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/chef" component={ChefScreen} />
          </div>
          <img className="background" src="/images/bg.jpg"></img>
        </main>
        <footer className="footer">
          S4T
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;