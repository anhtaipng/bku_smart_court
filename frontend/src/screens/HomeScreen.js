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

    return <div >
    <img className="bgimg" src="../images/bg.jpg"></img>
    <div className="w3-display-container w3-grayscale-min">
      <div className="w3-display-bottomleft w3-center w3-padding-large w3-hide-small">
        <span className="w3-tag"><big>Open from 6am to 5pm</big></span>
      </div>
      <div className="w3-display-middle w3-center">
        <span className="w3-text-white"  style={{fontSize: '100px', color: '#0066cc'}}></span>
      </div>
      <div className="w3-display-bottomright w3-center w3-padding-large">
        <span className="w3-text-white" class="w3-tag" ><big>Bach Khoa Campus, 268 Ly Thuong Kiet, HCMC</big></span>
      </div>
    </div>
    

    <div class="w3-sand w3-grayscale w3-large">
    

    <div class="w3-container" id="about">
      <div class="w3-content" style={{maxWidth:'700px'}}>
        <h5 class="w3-center w3-padding-64" ><span class="w3-tag w3-wide" style={{fontSize : '40px'}}>BACH KHOA SMART FOOD COURT</span></h5>
       
        <p>We have everything you need to full up your stomach</p>
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p><i>
“One cannot think well, love well, sleep well, if one has not dined well.”</i></p>
          <p>Team Dev S4T copied</p>
        </div>
        <img src="https://www.hcmut.edu.vn/upload/ctctsv1/images/2018%20-%202019/ct4.jpg"  style={{width : '100%', maxWidth : '1000px'}} class="w3-margin-top"/>
        <p><strong>Opening hours:</strong> everyday from 6am to 5pm.</p>
        <p><strong>Address:</strong> Bach Khoa Campus, 268 Ly Thuong Kiet Street, HCMC, Vietnam</p>
      </div>
    </div>
    
   
    <div class="w3-container" id="menu">
      <div class="w3-content" style={{maxWidth : '700px'}}>
     
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide" style={{fontSize: '30px'}}>THE MENU</span></h5>
      
        <div class="w3-row w3-center w3-card w3-padding">
          <a href="javascript:void(0)" onclick="openMenu(event, 'Eat');" id="myLink">
            <div class="w3-col s6 tablink"style={{fontSize: '30px'}}>Eat</div>
          </a>
          <a href="javascript:void(0)" onclick="openMenu(event, 'Drinks');">
            <div class="w3-col s6 tablink" style={{fontSize: '30px'}}>Drink</div>
          </a>
        </div>
    
        <div id="Eat" class="w3-container menu w3-padding-48 w3-card">

        </div>
    
        <div id="Drinks" class="w3-container menu w3-padding-48 w3-card">
          
        </div>  
        <img src="https://images.all-free-download.com/images/graphiclarge/fast_food_menu_template_contrast_design_on_dark_6826740.jpg" style={{width: '100%', maxWidth : '1000px', marginTop : '32px'}}/>
      </div>
    </div>
    

    <div class="w3-container" id="where" style={{paddingBottom: '32px'}}>
      <div class="w3-content" style={{maxWidth :'700px'}}>
        <h5 class="w3-center w3-padding-48"><span class="w3-tag w3-wide" style={{fontSize: '30px'}}>WHERE TO FIND US</span></h5>
        <p>Find us at some address at some place.</p>
        <img src="./images/map.png" class="w3-image" style={{width : '100%'}}/>
        
      </div>
    </div>
    

    </div>
    
    
    
    
    
    </div>
  
}
export default HomeScreen;