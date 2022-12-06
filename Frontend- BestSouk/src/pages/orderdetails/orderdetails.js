import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./orderdetails.css";
import Lottie from "react-lottie";
import dataa from "../../data.json";
import Navbar from "../../Components/navbar/navbar";
import Paper from "@material-ui/core/Paper";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fade from "react-reveal/Rotate";
import "animate.css/animate.min.css";
//import ScrollAnimation from "react-animate-on-scroll";
import Footer from "../../Components/footer/footer";
//import ProfilePic from "../profilepicture/profilepic";
import { Button } from "@material-ui/core";
//import ScrollAnimation from 'react-animate-on-scroll';

const OrderDetails = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState("");
 
  useEffect(() => {
    const orderDetails = async () => {
      let response = await axios.get(
        `http://localhost:8080/customer/orderdetails/${email}` 
      );
      setOrderData(response.data.data);
      //console.log("men data", response.data.data);
     // RemovePKR(response.data.data)


    };

    orderDetails();
  }, []);

  const orderDetail = async () => {
    let response = await axios.get(
      `http://localhost:8080/customer/orderdetails/${email}` 
    );
    setOrderData(response.data.data);
    //console.log("men data", response.data.data);
   // RemovePKR(response.data.data)


  };
  const clearHistory = async () => { 
    // console.log('file obj',selectedFile);
    console.log('emai;',email);
   
        await axios.delete(
          `http://localhost:8080/customer/clearhistory/${email}`
        )
        .then(res => {

          if (res.status == 200) {
            console.log('inside 200');
            orderDetail();
          }
             
      
          })
      .catch((error) => {
          // catch any unexpected errors
         // setSuccess (false);
          console.log(error);


      })
       // setProfileData(response.data.data);
       // console.log("name", response.data.data);
   
  }




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
      {orderData ? (
        <>
          <Fade top left>
          <ToastContainer />
            <Navbar />
            <div style={{textAlign:'center',padding:'30px'}}>
            <h1 className="order-history-color">Order History</h1>
            </div>
            <div style={{textAlign:'right',padding:'30px'}}>
            <Button
                 style={{ borderRadius: 35,width: '250px',height: '50px' }}
                variant="outlined"
            color="primary"
               disabled={orderData.length<1}
                onClick={()=>clearHistory()}
              >
              Clear History
              </Button>
            </div>
            {orderData.map((order,index) => 
  
            <Paper 
        className='order-paper'
        key= {index}
        elevation = {20}>
         <div style={{marginTop:'10px',display:'flex',flexDirection:'row',justifyContent:'space-Between'}}>
         <div>
         <h5 className="men-image-title"><span style={{color:'#003f5C'}}>Order Number:</span>    {order._id} </h5>
         </div>
         <div>
         <h5 className="men-image-title"><span style={{color:'#003f5C'}}>Price:</span>{order.price}</h5>
         </div>
         </div>
         <div style={{marginTop:'10px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <div>
         <h5 className="men-image-title"><span style={{color:'#003f5C'}}>Email:</span>    {order.email} </h5>
         </div>
         <div>
         <h5 className="men-image-title"><span style={{color:'#003f5C'}}>Name:</span>{order.name}</h5>
         </div>
         </div>
        
        <div style={{marginTop:'10px'}}>
        <h5 className="men-image-title"><span style={{color:'#003f5C'}}>Address:</span>{order.address}</h5>
        </div>

              
           
              
        </Paper>
    
       )}
        
            <Footer />
            
          </Fade>
        </>
      ) : (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
    </>
  );
};
export default OrderDetails;