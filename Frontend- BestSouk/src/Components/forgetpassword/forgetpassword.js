import React from "react";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
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
import "./forgetpassword.css";
import {ForgetPasswordSchema} from "../../schemas/forgetpasswordSchema";
//import loginImg from "../../Assests/loginImg.jpg";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
//import Visibility from "@material-ui/icons/Visibility";
//import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useFormik } from "formik";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

function ForgetPassword() {
  const {state} = useLocation();
  //console.log('email',state);
  const initialValues = {
    otp:'',
    password: "",
    email:state
  }
  const navigate = useNavigate();
   const [isClicked, setIsClicked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
const goBack = () => {
  navigate('/')
 
}
const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: ForgetPasswordSchema,
      onSubmit: async (values, action) => {
        setIsClicked(true);
        console.log('values',values);
         await axios.put("http://localhost:8080/customer/forgetpassword", values)
        .then(response => {
          if (response.status == 200) {
           
            console.log('inside 200');
           // console.log('data',response.data.data);
           // localStorage.setItem('token', response.data.data);
            //console.log('to',localStorage.getItem('token'));
            console.log('msg',response.data.message);
            setMessage('Password Changed Successfully');
            
            //localStorage.setItem('data', response.data);
            setTimeout(() => {
              navigate("/");
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
         setMessage('Invalid or Expired OTP');
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
      
      <Card className="forgetpasswordCard"   >
      {isClicked ? alert ?  <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{message}</strong>
          </Alert> : null: null} 
      <form onSubmit={handleSubmit}>
    
        
      <h3 className="forgetpasswordVerificationText">OTP Verfication and Change Password</h3>
      <div className="forgetpasswordDiv">
              <TextField
                //value={name}
                fullWidth
                name="otp"
                  value={values.otp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                label="OTP"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon style={{ color: "grey" }} />
                    </InputAdornment>
                  ),
                }}
                //  onChange={(e) => {
                //setName(e.target.value);
                // }}
              />
              {errors.otp && touched.otp ? (
                  <p className="forgetpasswordError">{errors.otp}</p>
                ) : null}
            </div>
            <div className="forgetpasswordDiv">
              <TextField
                //value={name}
                fullWidth   
                name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                label="New Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon style={{ color: "grey" }} />
                    </InputAdornment>
                  ),
                }}
                //  onChange={(e) => {
                //setName(e.target.value);
                // }}
              />
              {errors.password && touched.password ? (
                  <p className="forgetpasswordError">{errors.password}</p>
                ) : null}
            </div>

              <div className="forgetpasswordSubmitButtonDiv">
              <Button
                style={{ borderRadius: 15 }}
                color="primary"
                className="forgetpasswordSubmitButton"
                variant="contained"
                type = 'submit'
              >
                Submit
              </Button>
              <Button
                style={{ borderRadius: 15 }}
                color="primary"
                onClick={goBack}
                className="forgetpasswordSubmitButton"
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

export default ForgetPassword;
