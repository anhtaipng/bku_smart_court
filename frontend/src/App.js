import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import { useSelector } from 'react-redux';
import CartScreen from './screens/CartScreen';

function App() {

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
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
            <li>
              <a href="index.html">Food</a>
            </li>

            <li>
              <a href="index.html">Drinks</a>
            </li>

          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            
            <Route exact path="/" component={HomeScreen} />

          </div>

        </main>
    <footer className="footer">
          4T1S
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;