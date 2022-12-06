import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Lottie from "react-lottie";
import dataa from "../../data.json";
import Navbar from "../../Components/navbar/navbar";
import Paper from "@material-ui/core/Paper";
import Fade from "react-reveal/Rotate";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import Footer from "../../Components/footer/footer";
import ProfilePic from "../profilepicture/profilepic";
import { Button } from "@material-ui/core";

const Profile = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [profileData, setProfileData] = useState("");
  const imageProp = {
    height: 250,
    width: 250,
  };
  useEffect(() => {
    const fetchPost = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8080/customer/allcustomer",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setProfileData(response.data.data);
      console.log("name", response.data.data);
    
    }
    catch(error){
      navigate('/');
        console.error(error.message)
    }

    }
  

    fetchPost();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dataa,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigateModel = () =>{
    navigate('/modal', { state: profileData })
  }
  const orderDetails = () =>{
    navigate('/orderdetails')
  }
  const Logout = async () =>{
    localStorage.setItem('token', null);
    localStorage.setItem('count', 0);
    //console.log('after setting' , localStorage.getItem('token')); 
    console.log('emai;',email);
  
        await axios.delete(
          `http://localhost:8080/customer/deleteloggedinuser/${email}`  
        )
        .then(res => {

          if (res.status == 200) {
            console.log('inside 200');
            //localStorage.setItem('promolink','value');
           // console.log('local',localStorage.getItem('promolink'));
           
            navigate('/');
          }
             
      
          })
      .catch((error) => {
          // catch any unexpected errors
         // setSuccess (false);
          console.log(error);


      })
  //  navigate('/')
  }
  return (
    <>
      {profileData ? (
        <>
          <Fade top left>
            <Navbar />
            <div className="logout-button-div">
            <Button
                style={{ borderRadius: 20 }}
                color="primary"

                variant="contained"
                className="logout-button-profile"
               onClick={Logout}
              >
                Logout
              </Button>
              </div>
            <div className="profile-paper-parent">
              <Paper className="paper-profile" elevation={20}>
                <ProfilePic imageProp={imageProp} />
                
            
                <Paper elevation={2} className="paper-inside-paper-profile">

                <h1 className="profile-text">Profile Details</h1>
                </Paper>
                
                <hr className="details-hr"/>
              
                  <h1 className="profile-text" style={{marginTop:'25px'}}>
                    {profileData ? profileData.name : ""}
                  </h1>
              
                
                  <h2 className="profile-text" style={{marginTop:'25px'}}>
                    {profileData ? profileData.email : ""}
                  </h2>
              
                  <h3 className="profile-text" style={{marginTop:'25px'}}>
                    {profileData ? profileData.gender : ""}
                  </h3>
                
                <hr className="details-hr" />
                <Paper elevation={3} className="paper-inside-paper-profile" onClick={()=>orderDetails()}>
                <h1 className="profile-text">View Order Details</h1>
                </Paper>
                
                  
                
              </Paper>
              
            </div>
            <div className="edit-button-profile-div">
              <Button
                style={{ borderRadius: 20 }}
                color="primary"
                variant="contained"
                className="edit-button-profile"
               onClick={navigateModel}
              >
                Edit Profile
              </Button>
            </div>
            <Footer />
          </Fade>
        </>
      ) : (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
    </>
  );
};
export default Profile;
