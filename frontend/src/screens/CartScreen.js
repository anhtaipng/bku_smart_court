import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function CartScreen(props) {

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;


    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [])

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=payment");
    }

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
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
                                <div>
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/products/" + item.product}>
                                            <h2>
                                                • {item.name}
                                            </h2>
                                        </Link>
                                    </div>
                                    <div>
                                        <h3>
                                            • Quantity: {item.qty}
                                        </h3>
                                        <div>
                                            <button className="button" type="button" onClick={() => removeFromCartHandler(item.product)}>
                                                Delete
                                </button>
                                        </div>

                                    </div>
                                </div>
                                <div className="cart-price">
                                    {item.price}
                                </div>

                            </li>
                        )
                }
            </ul>
            <div>
                <Link to={cartItems.length === 0 ? "/" : "/vendor/" + cartItems[0].vendor}><h3>Order something else?</h3> </Link>
            </div>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ( {cartItems.reduce((a, c) => a += c.qty, 0)} items )
                :
                $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                Proceed to Checkout
            </button>
        </div>



    </div>
}


export default CartScreen;