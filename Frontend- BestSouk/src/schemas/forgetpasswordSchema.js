import * as Yup from "yup";
export const ForgetPasswordSchema = Yup.object({
  password: Yup.string().min(6).required("Please enter your Password"),
  otp: Yup.string().min(4).required("Please enter your OTP"),
 //password: Yup.string().min(6).required("Please enter your password"),
});