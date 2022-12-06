import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import "./singleproductdetail.css";
import StripeCheckout from 'react-stripe-checkout';
import Lottie from "react-lottie";
import dataa from "../../data.json";
import Navbar from "../../Components/navbar/navbar";
import Paper from "@material-ui/core/Paper";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fade from "react-reveal/Rotate";
import "animate.css/animate.min.css";
//import ScrollAnimation from "react-animate-on-scroll";
import Footer from '../../Components/footer/footer'
//import ProfilePic from "../profilepicture/profilepic";
//import { Button } from "@material-ui/core";
//import { Remove } from "@material-ui/icons";
import swal from 'sweetalert'
//import ScrollAnimation from 'react-animate-on-scroll';

const SingleDetails = () => {
    const {state} = useLocation();
    console.log('data',state);
  const email = localStorage.getItem("email");
  const publishableKey =
    'pk_test_51M6USXEwmBqyBd5JpTSwsQV0Ao49G5Wg246S6Q8dsP3gW7iLLuxXtmzSmllXC9GgJs18qwrc9Hv4X58FtKLoLRvT005TTf12Fo';
  const navigate = useNavigate();
  const [menData, setMenData] = useState(state);
  const amount = 500;
 
  // const RemovePKR =  (data) => {
  //   console.log('data',data);
  //   const removed = data.map((men, i) => {
  //     var result = men.price.slice(6);
  //     result = parseInt(result);
  //       console.log('result',result); 
  //    return result
      
  //   });
  //   console.log('removed',removed);
  
  // }

  const payNow = async token => {
    console.log(token);
    console.log('amounttt',menData);
    token.price = menData.price;
    token.name = menData.name;

    

    await axios.post(
      `http://localhost:8080/customer/payment/${menData._id}`, token
    )
    .then(res => {

      if (res.status == 200) {
        localStorage.setItem('order',1)
        swal({
          title: "Order Placed",
          text: "You have Successfully purchased this product",
          icon: "success",
          button: "OK",
        });
        navigate('/cart')

       

      }
         
  
      })
  .catch((error) => {
      // catch any unexpected errors
     // setSuccess (false);
      console.log(error);


  })
  };


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dataa,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
 
  return (
    <>
      {menData ? (
        <>
          <Fade top left>
          <ToastContainer />
            <Navbar />
            <div style={{textAlign:'center',padding:'30px'}}>
            <h1 className="order-history-color">Selected Product</h1>
            </div>
   
            <Paper 
        className='single-product-paper'
        elevation = {20}>
         <div className="scrape-images">
         <div style={{marginTop:'60px'}}>
        <h5 className="men-image-title">{menData.name} </h5>
        <h6 className = 'men-image-price'>PKR {menData.price} </h6>
        <StripeCheckout
        stripeKey={publishableKey}
        className = 'pay-now-button'
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={menData.price}
        description={`Your total is ${menData.price}`}
        token={payNow}
      />
              
              </div>
              
              <div>
        <img src =  {menData.img} alt = 'image' className="men-imges" height={250} width={500}/>
       
        </div>
       
        </div>
        
           
              
        </Paper>
       
       
            <Footer />
            
          </Fade>
        </>
      ) : (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
    </>
  );
};
export default SingleDetails;