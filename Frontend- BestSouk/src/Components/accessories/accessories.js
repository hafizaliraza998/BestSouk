import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./accessories.css";
import Lottie from "react-lottie";
import dataa from "../../data.json";
import Navbar from "../navbar/navbar";
import Paper from "@material-ui/core/Paper";
import Fade from "react-reveal/Rotate";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import Footer from "../footer/footer";
//import ProfilePic from "../profilepicture/profilepic";
import { Button } from "@material-ui/core";
//import ScrollAnimation from 'react-animate-on-scroll';

const Accessories = () => {
  const navigate = useNavigate();
  const [accessoriesData, setAccessoriesData] = useState("");
 
  useEffect(() => {
    const AccessoriesData = async () => {
      let response = await axios.get(
        "http://localhost:8080/customer/accessories" 
      );
      setAccessoriesData(response.data.data);
      console.log("men data", response.data.data);
    };

    AccessoriesData();
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
      {accessoriesData ? (
        <>
          <Fade top left>
            <Navbar />
            {accessoriesData.map(accessories => <Paper 
        className='accessoriesData-paper'
        key={accessories.id}
        elevation = {20}>
        <img src =  {accessories.images} alt = 'image' className="accessoriesData-imges" />
        <h5 className="accessoriesData-image-title">{accessories.title} </h5>
        <h6 className = 'accessoriesData-image-price'>{accessories.price } </h6>
        
        <Button
                style={{ borderRadius: 20 }}
                color="primary"
                variant="contained"
                className="addtocart-button"
               //onClick={navigateModel}
              >
                Add to Cart
              </Button>
        </Paper>)}
            <Footer />
          </Fade>
        </>
      ) : (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
    </>
  );
};
export default Accessories;