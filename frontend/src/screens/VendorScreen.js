import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import {listVendors} from '../actions/vendorActions';

function VendorScreen(props) {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    const vendor = props.match.params.id ? props.match.params.id : '';

    const vendorList = useSelector(state => state.vendorList);
    const { vendors, loading: loadingVendors, error: errorVendors } = vendorList;

    useEffect(() => {
        dispatch(listProducts(vendor));
        return () => {
            //
        }
    }, [vendor])

    useEffect(() => {
        dispatch(listVendors());
        return () => {
            //
        }
    }, [])

    return loading ? (<div>...LOADING...</div>) :
            error ? (<div>{error}</div>) :
                (<ul className="products">
                    {
                        products.map(product =>
                            <li key={product._id}>
                                <div className="product">
                                    <Link to={'/product/' + product._id}><img className="product-image" src={product.image} alt="product" /></Link>
                                    <div className="product-name">
                                        <Link to={'/product/' + product._id}>{product.name}</Link>
                                    </div>
                                    <div className="product-brand">{product.brand}</div>
                                    <div className="product-price">{product.price} VND</div>
                                </div>
                            </li>
                        )
                    }

                </ul>)
}

export default VendorScreen;