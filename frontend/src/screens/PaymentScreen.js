import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function PaymentScreen(props) {
  const submitHandler = (e) => {
    props.history.push('placeorder');
  };

  return <div className="form">
    <form onSubmit={submitHandler}>
      <ul className="form-container">
        <li>
          <h2>Payment</h2>
        </li>
        <li>
          <h3>
            Log in your MOMO wallet account to check out
          </h3>
        </li>
        <li>
          <label htmlFor="email">
            <b> Email/phone number </b>
          </label>
          <input type="email" placeholder="Phone number/Momo username" name="email" id="email" >
          </input>
        </li>
        <li>
          <label htmlFor="password"> <b>Password</b></label>
          <input type="password" placeholder="Password" id="password" name="password">
          </input>
        </li>
        <li>
          <button type="submit" className="button primary"> Pay </button>
        </li>


      </ul>
    </form>
  </div>
}
export default PaymentScreen;