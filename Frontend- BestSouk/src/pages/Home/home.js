import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './home.css'
import '../About/aboutus.css'
import Lottie from 'react-lottie';
import dataa from '../../data.json'
import Navbar from '../../Components/navbar/navbar';
import Carousel from '../../Components/carousel/carousel';
import Paper from "@material-ui/core/Paper";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fade from 'react-reveal/Zoom';
import "animate.css/animate.min.css";
import AboutImage from '../../Assests/aboutus.webp';
import ScrollAnimation from 'react-animate-on-scroll';
import Footer from '../../Components/footer/footer';
import { useNavigate } from 'react-router-dom';
import WLogo from "../../Assests/w1.webp";
import KLogo from "../../Assests/k1.webp";
import Logo from "../../Assests/m1.jpeg";
import Logo2 from "../../Assests/m2.webp";
import KLogo2 from "../../Assests/k2.webp";
import WLogo2 from "../../Assests/w2.webp";
import Logo3 from "../../Assests/m3.webp";
import WLogo3 from "../../Assests/w3.webp";
import KLogo3 from "../../Assests/k3.webp";
import { flexbox } from '@mui/system';
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('')
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData:dataa ,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        
        const {data: response} = await axios.get("http://localhost:8080/customer/allcustomer",{ headers: {"Authorization" : localStorage.getItem('token')}} );
        console.log('response',response);
        localStorage.setItem('email',response.data.email)
        const timer = setTimeout(() => {
          setData('response',response);
        }, 3000);
       
      } catch (error) {
        navigate('/');
        console.error(error.message)
        
      }
      setLoading(false);
    }

    fetchData();
  }, []);

const navigateMen = () => {
 // console.log('men');
  navigate('/menwear')
} 
const navigateWomen = () => {
 // console.log('men');
  navigate('/womenwear')
} 
const navigateAccessories = () => {
 // console.log('men');
  navigate('/accessories')
} 
const navigateFragrances = () => {
  //console.log('men');
  navigate('/fragrances')
}
  return (
    <>
   
      {data ?
       <>
      <Fade left >
       <Navbar /> 
       <Carousel />
       <ScrollAnimation animateIn="fadeIn" animateOut='fadeOut' duration="3s">
       
       <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',padding:'30px'}}>
       <div>
       <img src = {Logo} alt = 'image'  width={250} />
       </div>
       <div>
       <img src = {Logo2} alt = 'image'  width={250} />
       </div>
       <div>
       <img src = {Logo3} alt = 'image'  width={250} />
       </div>
       <div className='mens-wear-icon' onClick={navigateFragrances} style={{cursor:'pointer'}}>
       <ArrowForwardIcon  style={{ fontSize: "40px" }} />
       </div>
       </div>
       <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',padding:'30px'}}>
       <div>
       <img src = {WLogo} alt = 'image'  width={250} />
       </div>
       <div>
       <img src = {WLogo2} alt = 'image'  width={250} />
       </div>
       <div>
       <img src = {WLogo3} alt = 'image'  width={250} />
       </div>
       <div className='mens-wear-icon' onClick={navigateFragrances} style={{cursor:'pointer'}}>
       <ArrowForwardIcon  style={{ fontSize: "40px" }} />
       </div>
       </div>
       <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',padding:'30px'}}>
       <div>
       <img src = {KLogo} alt = 'image'  width={250} />
       </div>
       <div>
       <img src = {KLogo2} alt = 'image'  width={250} />
       </div>
       <div>
       <img src = {KLogo3} alt = 'image'  width={250} />
       </div>
       <div className='mens-wear-icon' onClick={navigateFragrances} style={{cursor:'pointer'}}>
       <ArrowForwardIcon  style={{ fontSize: "40px" }} />
       </div>
       </div>
    
    <div className="aboutus-parent">
    <div className="aboutus-child">
  
    <h6  style = {{marginLeft:'45px',fontSize:'13px',marginTop:'180px'}} className="aboutus-para"> Best Souck is a Professional ecommerce Platform and here we will provide you only interesting content, which you will like very much.We're dedicated to providing you the best of ecommerce with a focus on dependability and Get Pakistan online brands products.We're working to turn our passion for ecommerce into a booming.We hope you enjoy our as much as we enjoy offering them to you.
    I will keep posting more important posts on my Website for all of you.Please give your support and love.Thanks For Visiting Our Site Have a nice day!
    </h6>
    </div>
    <div className="aboutus-child">
    <img src={AboutImage} alt="image" />
    </div>
    </div>
    

       <Footer />
       </ScrollAnimation>
       </Fade>
       </>
   
      :
      <Lottie options={defaultOptions} height={400} width={400}/>
      
 }
   </>
  )
}
export default Home;