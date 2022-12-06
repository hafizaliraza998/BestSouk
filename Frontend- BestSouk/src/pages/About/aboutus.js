import "./aboutus.css";
import {useEffect } from "react";
import Navbar from "../../Components/navbar/navbar"
//import navbar from "../../Components/navbar/navbar";
import Footer from "../../Components/footer/footer";
import AboutImage from '../../Assests/aboutus.webp';
import { Paper } from "@material-ui/core";
import Fade from 'react-reveal/Rotate'
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AboutUs() {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyRoute = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8080/customer/verifyroute",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
    
    }
    catch(error){
      navigate('/');
        console.error(error.message)
    }

    }
  

    verifyRoute();
  }, []);
  return (
    <div className="parent-all">
    <Navbar />
    <Fade top left>
    <Paper elevation={20} className = "paper-about-us">
    <div className="aboutus-parent">
    <div className="aboutus-child">
    <h1  className="aboutus-heading"> About Us</h1>
    <h6  style = {{marginLeft:'15px',fontSize:'13px'}} className="aboutus-para"> Best Souck is a Professional ecommerce Platform and here we will provide you only interesting content, which you will like very much.We're dedicated to providing you the best of ecommerce with a focus on dependability and Get Pakistan online brands products.We're working to turn our passion for ecommerce into a booming.We hope you enjoy our as much as we enjoy offering them to you.
    I will keep posting more important posts on my Website for all of you.Please give your support and love.Thanks For Visiting Our Site Have a nice day!
    </h6>
    </div>
    <div className="aboutus-child">
    <img src={AboutImage} alt="image" />
    </div>
    </div>
    
    </Paper>
    </Fade>
    <Footer /> 
    </div>
    
      
)
    
}

export default AboutUs;
  