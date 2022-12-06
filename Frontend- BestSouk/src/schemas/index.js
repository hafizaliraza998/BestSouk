import * as Yup from "yup";
export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().min(10).required("Please enter your email")
  .matches(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<,>()\.,;:\s@\"]{2,})$/,
  "Invalid email address"),
  gender: Yup.string().min(1).required("Please enter your gender"),
 password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
     .required()
     .oneOf([Yup.ref("password"), null], "Password must match"),
});