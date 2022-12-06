import "./category.css";
//import { useState } from "react";
import Navbar from "../../Components/navbar/navbar"
//import navbar from "../../Components/navbar/navbar";
import Footer from "../../Components/footer/footer";
//import AboutImage from '../../Assests/aboutus.webp';
import Kids from "../../Assests/kid.webp";
import Men from '../../Assests/men.webp';
import Women from '../../Assests/women.webp'
import { Paper } from "@material-ui/core";
import Fade from 'react-reveal/Rotate'
import Access from '../../Assests/Access.webp'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Category() {
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
const  navigateMenSection = () => {
  navigate('/menwear')
} 
const  navigateWomenSection = () => {
  navigate('/womenwear')
} 
const  navigateAccessoriesSection = () => {
  navigate('/accessories')
}
const  navigateKidsSection = () => {
  navigate('/kids')
}
  return (
    <div>
    <Navbar />
    <Fade top left>
    <div className="categoryParentDiv">
    <div className="categoryChildPaper" onClick={navigateKidsSection}> 
    <Paper elevation={20} className = "categoryParent">
    <img src={Kids} alt = 'image'  />
    <h5 className="categoryPaperHeading">Kids Section </h5> 
    </Paper>
    </div>
    <div className="categoryChildPaper" onClick={navigateMenSection}> 
    <Paper elevation={20} className = "categoryParent">
    <img src={Men} alt = 'image'  />
    <h5 className="categoryPaperHeading">Men's Section </h5> 
    </Paper>
    </div>
    

    </div>
    <div className="categoryParentDiv">
    <div className="categoryChildPaper" onClick={navigateWomenSection}> 
    <Paper elevation={20} className = "categoryParent">
    <img src={Women} alt = 'image'  />
    <h5 className="categoryPaperHeading">Women's Section </h5>
    </Paper>
    </div>
    <div className="categoryChildPaper" onClick={navigateAccessoriesSection}> 
    <Paper elevation={20} className = "categoryParent">
    <img src={Access} alt = 'image' className="categoryImage" />
    <h5 className="categoryPaperHeading">Accessories </h5>
    </Paper>
    </div>
    

    </div>
    </Fade>
    <Footer /> 
    </div>
    
      
)
    
}

export default Category;