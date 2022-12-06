import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./promotion.css";
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
  const [promotionData, setPromotionData] = useState("");
 
  useEffect(() => {
    const promotionDetails = async () => {
      let response = await axios.get(
        `http://localhost:8080/customer/promotions/${email}` 
      );
      setPromotionData(response.data.data);
      //console.log("men data", response.data.data);
     // RemovePKR(response.data.data)


    };

    promotionDetails();
  }, []);

 



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
    <Fade top left>
          <ToastContainer />
            <Navbar />
      {promotionData && promotionData.length > 0 ? (
        <>
          
            <div style={{textAlign:'center',padding:'30px'}}>
            <h1 className="order-history-color">Promotion Data</h1>
            </div>

            {promotionData.map((order,index) => 
  
            <Paper 
        className='order-paper'
        key= {index}
        elevation = {20}>
            
            
         <div style={{marginTop:'10px',display:'flex',flexDirection:'row',justifyContent:'space-Between'}}>     
         <div>
         <h4 className="men-image-title"><span style={{color:'#003f5C',textAlign:'center'}}>Title:</span>   {order.title} </h4>
         </div>
         <div>
         <h4 className="men-image-title"><span style={{color:'#003f5C'}}>Sendr:</span>   {order.sender} </h4>
         </div>
         </div>

         <h6 className="men-image-title"><span style={{color:'#003f5C'}}>Description:</span>   {order.description} </h6>   
           
              
        </Paper>
    
       )}
        
           
        </>
      ) : (
        <>
        
        
        <h1 className="men-image-title"><span style={{color:'#003f5C',textAlign:'center'}}>No Promotion found</span>   </h1>
        </>
      )}
      <Footer />
            
            </Fade>
      
    </>
  );
};
export default OrderDetails;