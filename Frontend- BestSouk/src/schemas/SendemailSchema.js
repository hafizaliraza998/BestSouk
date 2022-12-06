import * as Yup from "yup";
export const SendemailSchema = Yup.object({
  email: Yup.string().min(10).required("Please enter your email")
  .matches(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<,>()\.,;:\s@\"]{2,})$/,
  "Invalid email address"),
 //password: Yup.string().min(6).required("Please enter your password"),
});