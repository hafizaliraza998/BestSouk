import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Fade from 'react-reveal/Zoom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  //CardContent,
  //Typography,
  //Divider,
  //CardMedia,
  TextField,
 // IconButton,
} from "@material-ui/core";
import "./sendemail.css";
import {SendemailSchema} from "../../schemas/SendemailSchema";
import loginImg from "../../Assests/loginImg.jpg";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
//import Visibility from "@material-ui/icons/Visibility";
//import VisibilityOff from "@material-ui/icons/VisibilityOff";
//import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useFormik } from "formik";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
const initialValues = {
  email: "",
};
function SendEmail() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
   const [isClicked, setIsClicked] = useState(false);
  const [alert, setAlert] = useState(false);
  const goBack = () =>{
    navigate('/')
  }

const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SendemailSchema,
      onSubmit: async (values, action) => {
        setIsClicked(true);
        //console.log('submit');
         await axios.post(`http://localhost:8080/customer/sendemail/${email}`, values)
        .then(response => {
          if (response.status == 200) {
           
            console.log('inside 200');
           // console.log('data',response.data.data);
           // localStorage.setItem('token', response.data.data);
            //console.log('to',localStorage.getItem('token'));
            console.log('msg',response.data.message);
            
            //localStorage.setItem('data', response.data);
            setTimeout(() => {
              navigate("/forgetpassword",{ state: values.email});
            }, 4000);
           // navigate('home');
           toast.success('Please Check your Email !', {
            position: toast.POSITION.TOP_CENTER
        });
       
            action.resetForm();
            
           // useFormik.resetForm();
          }
              //console.log(response.message)
      
          })
      .catch((error) => {
          // catch any unexpected errors
         //setSuccess (true);
         setAlert(true);
          console.log(error);


      })
        
       // console.log(values);
      
        //<Alert severity="error">Sample Error Message</Alert>
      },
    });
  //console.log(errors);
  return (
   
    <div className="parentSendEmail">
      <Fade left>
      
      <Card className="sendEmailCard" >
      {isClicked ? alert ?  <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>Invalid Email</strong>
          </Alert> : null: null} 
      <form onSubmit={handleSubmit}>
    
        
      <h3 className="sendemailVerificationText">Email Verfication</h3>
            <div className="emailDiv">
              <TextField
                //value={name}
                fullWidth
                name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                label="Email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle style={{ color: "grey" }} />
                    </InputAdornment>
                  ),
                }}
                //  onChange={(e) => {
                //setName(e.target.value);
                // }}
              />
              {errors.email && touched.email ? (
                  <p className="sendEmailError">{errors.email}</p>
                ) : null}
            </div>

              <div className="sendEmailSubmitButtonDiv">
              <Button
                style={{ borderRadius: 15 }}
                color="primary"
                className="sendEmailSubmitButton"
                variant="contained"
                type = 'submit'
              >
                Submit
              </Button>
           
              </div> 
              <div className="sendEmailSubmitButtonDiv">
              <Button
                style={{ borderRadius: 15 }}
                color="primary"
                onClick={goBack}
                className="sendEmailSubmitButton"
                variant="contained"
              >
                Go Back
              </Button>
           
              </div> 
          
        </form>
        <ToastContainer />
      </Card>
      </Fade>
    </div>
  //   </div>
  );
}

export default SendEmail;
