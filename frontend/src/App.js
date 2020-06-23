import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import { useSelector } from 'react-redux';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
function App() {


  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;


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
              <img  src='../images/cart.jpg' alt="Cart" width="34" height="30"/>
            </Link>
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Sign in</Link>
          </div>
        </header>
        <aside className="sidebar">
          <h3 className="item">Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
              <a className="item item-btn" href="#">Food</a>
              <a className="item item-btn" href="#">Drinks</a>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route exact path="/" component={HomeScreen} />
          </div>
          <img className="background" src="/images/bg.jpg"></img>
        </main>
    <footer className="footer">
          4T1S
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;