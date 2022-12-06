import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cart.css";
//import StripeCheckout from 'react-stripe-checkout';
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
import { Button } from "@material-ui/core";
//import { Remove } from "@material-ui/icons";
import DeleteIcon from '@mui/icons-material/Delete';
//import ScrollAnimation from 'react-animate-on-scroll';

const Cart = () => {
  const email = localStorage.getItem("email");
  var navigate = useNavigate();
  const [menData, setMenData] = useState('');


 
  useEffect(() => {
    

    MenWearData();
  }, []);
  const MenWearData = async () => {
    let response = await axios.get(
      `http://localhost:8080/customer/viewcart/${email}`
    );
    setMenData(response.data.data);
   // console.log("men data", response.data.data);
    //RemovePKR(response.data.data);
  };

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

  const ViewDetails =  (men) => {
console.log('men',men);
navigate('/singledetails',
{ state: men });

    
  };
  const deleteItem = async (men) => {
    console.log('men',men);
    await axios.delete(
      `http://localhost:8080/customer/deletecartitem/${men._id}`  
    )
    .then(res => {

      if (res.status == 200) {
        console.log('inside 200');
        MenWearData();
        //localStorage.setItem('promolink','value');
       // console.log('local',localStorage.getItem('promolink'));
       
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
            <h1 className="order-history-color">Cart Details</h1>
            </div>
          
            {menData.map((men,index) =>
           
            <div className="web-scrape-images">
            
            <Paper 
        className='men-paper'
        key= {index}
        elevation = {20}>
         <div className="scrape-images" >
         <div style={{marginTop:'60px'}}>
        <h5 className="men-image-title">{men.name} </h5>
        <h6 className = 'men-image-price'>PKR {men.price} </h6>
        <Button
                 style={{ borderRadius: 35,width: '230px',height: '40px' }}
                color="primary"
                variant="contained"
                className="buttonWidthsignup"
                onClick={()=>ViewDetails(men)}
              >
                Pay Now
              </Button>
              
              </div>
              
              <div>
        <img src =  {men.img} alt = 'image' className="men-imges" height={250} width={500}/>
        </div>
        <div>  < DeleteIcon 
        color="error"
        onClick= {()=>deleteItem(men)}
        style = {{ fontSize: '50px',marginLeft: '20px',cursor:'pointer'}}
        /></div>
       
        </div>
       
       
        
           
              
        </Paper>
       
   
        </div>
        
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
export default Cart;