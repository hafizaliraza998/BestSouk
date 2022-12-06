import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Fade from 'react-reveal/Zoom';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  CardMedia,
  TextField,
  IconButton,
} from "@material-ui/core";
import "./login.css";
import { loginSchema } from "../../schemas/login";
import loginImg from "../../Assests/loginImg.jpg";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useFormik } from "formik";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import swal from "sweetalert";
const initialValues = {
  email: "",
  password: "",
};
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [success, setSuccess] = useState(true);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const signupNavigate = () => {
    navigate('/signup');
}
const navigateSendEmail = () => 
{
 navigate('/sendemail')
}
const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        setIsClicked(true);
         await axios.post("http://localhost:8080/customer/login", values)
        .then(response => {

          if (response.status == 200) {
            //console.log('inside 200');
           // console.log('data',response.data.data);
           //console.log('before token',localStorage.getItem('token'));
            localStorage.setItem('token', response.data.data);
            //console.log('token after',localStorage.getItem('token'));
          //  console.log('msg',response.data.message);
            //localStorage.setItem('data', response.data);
           
            navigate('/home');
            action.resetForm();
            
           // useFormik.resetForm();
          }
              //console.log(response.message)
      
          })
      .catch((error) => {
          // catch any unexpected errors
          setSuccess (false);
          swal({
            title: "Login failed",
            text: "Invalid credentials",
            icon: "error",
            button: "OK",
          });
          console.log(error);


      })
        
       // console.log(values);
      
        //<Alert severity="error">Sample Error Message</Alert>
      },
    });
  console.log(errors);
  return (
    <div>
      <Fade left>
      <Card className="card" variant="outlineds"  >
      <form onSubmit={handleSubmit}>
        <div className="parent-div">
          <div>
            <CardMedia className="media" image={loginImg} />
            <CardContent>
              <Divider light />
            </CardContent>
            <Typography
              // className={"MuiTypography--subheading"}
              variant={"h9"}
              style={{ color: "#4169e1" }}
            >
              Does not have any account ?
            </Typography>
            <span className="signup-span">
              <Button
                 style={{ borderRadius: 35,width: '170px',height: '40px' }}
                color="primary"
                variant="contained"
                className="buttonWidthsignup"
                onClick={signupNavigate}
              >
                Sign Up
              </Button>
            </span>
          </div>
          <div className="text-input-parent">
            <div>
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
                  <p className="form-error">{errors.email}</p>
                ) : null}
            </div>
            <div>
              <TextField
                fullWidth
                required
                name="password"
                  label="  Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                //variant="outlined"
                type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                //onChange={someChangeHandler}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon style={{ color: "grey" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
               {errors.password && touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : null}
            </div>
            <div>
              <Button
                style={{ borderRadius: 15 }}
                color="primary"
                className="buttonWidth"
                variant="contained"
                type = 'submit'
              >
                Login
              </Button>
            </div>
            <Divider light />
            <div>
              <Typography
                // className={"MuiTypography--subheading"}
                variant={"h9"}
                style={{ color: "#4169e1" }}
              >
                Forget Password ?
              </Typography>
              <span className="signup-span">
                <Button
                  style={{ borderRadius: 35,width: '170px',height: '40px' }}
                  color="primary"
                  variant="contained"
                  className="buttonWidthsignup"
                  onClick = {navigateSendEmail}

                  

                >
                  Retrieve
                </Button>
              </span>
            </div>
          </div>
        </div>
        </form>
      </Card>
      </Fade>
    </div>
  );
}

export default Login;
