import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
function PlaceOrderScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const _id = userInfo._id;

    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    var { loading, success, error, order } = orderCreate;

    const { cartItems } = cart;

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const totalPrice = itemsPrice;
    const vendor = cartItems[0].vendor;

    const [requirement, setRequirement] = useState('');

    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        // create an order
        dispatch(createOrder({
            orderItems: cartItems, _id, totalPrice, requirement, vendor
        }));
    }
    useEffect(() => {
        if (success) {
            props.history.push("/profile/" + userInfo._id);

        }

    }, [success]);

    return <div>
        <div className="placeorder">
            <div className="placeorder-info">
                <ul className="cart-list-container">
                    <div>
                        <h3>Special requirement</h3>
                        
                            <input onChange={(e) => setRequirement(e.target.value)}  type="text" style={{height: '20px'}, {width: '920px'}}
                            placeholder="You can enter your special requirements for the food to chef such as spicy or not spicy, not too salty, low sugar, after how long you come to receive the food">                               
                            </input>
                    </div>
                    <li>
                        <h3>
                            Shopping Cart
          </h3>
                        <div>
                            Price
          </div>
                    </li>
                    {
                        cartItems.length === 0 ?
                            <div>
                                Cart is empty
          </div>
                            :
                            cartItems.map(item =>
                                <li>
                                    <div className="cart-image">
                                        <img src={item.image} alt="product" />
                                    </div>
                                    <div className="cart-name">
                                        <div>
                                            <Link to={"/product/" + item.product}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div>
                                            Qty: {item.qty}
                                        </div>
                                    </div>
                                    <div className="cart-price">
                                        ${item.price}
                                    </div>
                                </li>
                            )
                    }
                </ul>
            </div>



            <div className="placeorder-action">
                <ul>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>${itemsPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${totalPrice}</div>
                    </li>
                    <li>
                        <button className="button primary" onClick={placeOrderHandler} >Place Order</button>
                    </li>
                </ul>

            </div>

        </div>

    </div>

}

export default PlaceOrderScreen;