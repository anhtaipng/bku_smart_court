import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    }

    return <div>
        <div className="back-to-homepage"><Link to="/">Back To Homepage</Link></div>
        {loading ? <div>...Loading...</div> :
            error ? <div>{error}</div> :
                <div className="details">
                    <div>
                        <img src={product.image} alt="product"></img>
                    </div>
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>•       {product.name}</h4>
                            </li>
                            <li>
                            •        {product.rating} Stars ({product.numReviews} Reviews)
                    </li>
                            <li>
                            •       Price: <b>${product.price}</b>
                            </li>
                            <li>
                                {product.description}
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price: {product.price}
                            </li>
                            <li>
                                Status: {product.countInStock>0?"In Stock":"Unavailable"}
                            </li>
                            <li>
                                Quanlity: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                    {[...Array(product.countInStock).keys()].map(x =>
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    )}

                                </select>
                            </li>
                            <li>
                                {product.countInStock>0&&<button onClick={handleAddToCart} className="button">Add To Carl</button>}
                            </li>
                        </ul>
                    </div>
                </div>}
    </div>

}

export default ProductScreen;