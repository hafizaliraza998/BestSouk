import React from "react";
import { Routes, Route,BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/home.js";
import Login from "./pages/Login/login.js";
import Signup from "./pages/Signup/signup";
import AboutUs from "./pages/About/aboutus";
import Cart from './pages/cart/cart'
import PrivateRoute from "./pages/privateRoutes";
import Profile from './pages/profile/profile'
import ProfilePic from "./pages/profilepicture/profilepic";
import UpdateModal from '../src/pages/ModalOfUpdateProfile/modal'
import Category from '../src/pages/Categories/category'
import MenWear from './Components/menwear/menwear'
import { useState } from 'react';
import WomenWear from '../src/Components/womenwear/womenwear'
import Accessories from "./pages/accessories/accessories";
import Kids from "./Components/kids/kids";
import SendEmail from '../src/pages/sendemail/sendemail'
import ForgetPassword from '../src/Components/forgetpassword/forgetpassword'
import SingleDetails from "./pages/singleproductdetail/singleproductdetail.js";
import OrderDetails from "./pages/orderdetails/orderdetails.js";
import Promotion from './pages/promotion/promotion';

function App() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('token'));
 

  localStorage.setItem('count',0);
  localStorage.setItem('order',0);
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} /> 
          
          <Route element={<PrivateRoute />}>
                 <Route path="aboutus" element={<AboutUs />} />
                 <Route path="profile" element={<Profile />} />
                 <Route path="modal" element={<UpdateModal />} />
                 <Route path="category" element={<Category />} />
                 <Route path="profilepicture" element={<ProfilePic />} />
                 <Route path="home" element={<Home />} />
                 <Route path="menwear" element={<MenWear />} />
                 <Route path="womenwear" element={<WomenWear />} />
                 <Route path="accessories" element={<Accessories />} />
                 <Route path="kids" element={<Kids />} />
                 <Route path="sendemail" element={<SendEmail />} />
                 <Route path="forgetpassword" element={<ForgetPassword />} />
                 <Route path="cart" element={<Cart />} />
                 <Route path="singledetails" element={<SingleDetails />} />
                 <Route path="orderdetails" element={<OrderDetails />} />
                 <Route path="promotion" element={<Promotion />} />
                 </Route>
          
          </Routes>
      </BrowserRouter>

  
  );
}

export default App;
