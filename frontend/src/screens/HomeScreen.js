import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import {listVendors} from '../actions/vendorActions';

function HomeScreen(props) {

    const vendor = props.match.params.id ? props.match.params.id : '';

    const vendorList = useSelector(state => state.vendorList);
    const { vendors, loading: loadingVendors, error: errorVendors } = vendorList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listVendors());
        return () => {
            //
        }
    }, [])

    return <div>
        Welcome to BKU Smart Food Court, please chosse the vendor in the sidebar on top left!
    </div>
}
export default HomeScreen;