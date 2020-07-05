import {
    VENDOR_LIST_REQUEST, VENDOR_LIST_SUCCESS, VENDOR_LIST_FAIL,
} from '../constants/vendorConstants'

import axios from 'axios';


const listVendors = () => async (dispatch) => {
    try {
        dispatch({ type: VENDOR_LIST_REQUEST });
        const { data } = await axios.get("/api/vendors");
        dispatch({ type: VENDOR_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: VENDOR_LIST_FAIL, payload: error.message });
    }
}

export { listVendors }