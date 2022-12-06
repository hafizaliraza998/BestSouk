import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Fade from 'react-reveal/Rotate'
import {
  Button,
  Card,
  CardContent,
  Divider,
  CardMedia,
  TextField,
  IconButton,
} from "@material-ui/core";
import "./signup.css";
import { signUpSchema } from "../../schemas/index";
import facebookImg from "../../Assests/facebook.png";
import twitterImg from "../../Assests/twitterImg.png";
import InstaImg from "../../Assests/instaImg.jpg";
import loginImg from "../../Assests/loginImg.jpg";
//import MuiAlert from "@material-ui/lab/Alert";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import WcIcon from "@material-ui/icons/Wc";
import PersonIcon from "@material-ui/icons/Person";
import { useFormik } from "formik";
import swal from "sweetalert";
const initialValues = {
  name: "",
  email: "",
  gender: "",
  password: "",
  confirm_password: "",
};
function Signup() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const loginNavigate = () => {
    navigate("/");
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        setIsClicked(true);
        const response = await axios.post(
          "http://localhost:8080/customer/register",
          values
        );
        console.log(response.status);
        if (response.status == 200) {
          swal({
            title: "Signup ",
            text: "Signup successfully",
            icon: "success",
            button: "OK",
          });
          console.log("data", response.data.message);
          setAlert(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);

          // useFormik.resetForm();
        }
        action.resetForm();
      },
    });
  console.log(errors);
  return (
    <div>
     
      
       <Fade top left>
      <Card className="card" variant="outlined">
        <form onSubmit={handleSubmit}>
          <div className="parent-div">
            <div>
              <CardMedia className="media" image={loginImg} />
              <CardContent>
                <Divider light />
              </CardContent>

              <span className="se">
                <h3>Signup with</h3>
              </span>
              <div className="media-icon-parent">
                <div className="media-img">
                  <img
                    height={50}
                    width={50}
                    src={facebookImg}
                    alt="facebook logo"
                  />
                </div>
                <div className="media-img">
                  <img
                    height={60}
                    width={70}
                    src={InstaImg}
                    alt="facebook logo"
                  />
                </div>
                <div className="media-img">
                  <img
                    height={60}
                    width={80}
                    src={twitterImg}
                    alt="facebook logo"
                  />
                </div>
              </div>
            </div>

            <div className="text-input-parent">
              <div>
                <TextField
                  //value={name}
                  fullWidth
                  required
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  //value={name}
                  fullWidth
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    ),
                  }}
                  //  onChange={(e) => {
                  //setName(e.target.value);
                  // }}
                />
                {errors.name && touched.name ? (
                  <p className="form-error">{errors.name}</p>
                ) : null}
              </div>
              <div>
                <TextField
                  //value={name}
                  fullWidth
                  name="gender"
                  label="Gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WcIcon style={{ color: "grey" }} />
                      </InputAdornment>
                    ),
                  }}
                  //  onChange={(e) => {
                  //setName(e.target.value);
                  // }}
                />
                {errors.gender && touched.gender ? (
                  <p className="form-error">{errors.gender}</p>
                ) : null}
              </div>
              <div>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
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
                <TextField
                  fullWidth
                  name="confirm_password"
                  label=" Confirm Password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  //variant="outlined"
                  type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens
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
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="form-error">{errors.confirm_password}</p>
                ) : null}
              </div>

              <div>
                <Button
                  style={{ borderRadius: 15 }}
                  color="primary"
                  className="buttonWidth"
                  variant="contained"
                  type="submit"
                >
                  Sign up
                </Button>
              </div>
            </div>

            <div>
              <span className="signup-span">
                <Button
                  style={{ borderRadius: 15 }}
                  color="primary"
                  variant="contained"
                  className="buttonWidthsignup"
                  onClick={loginNavigate}
                >
                  Login
                </Button>
              </span>
            </div>
          </div>
        </form>
      </Card>
      </Fade>
    </div>
  );
}

export default Signup;
