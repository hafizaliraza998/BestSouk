import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import ClearIcon from '@mui/icons-material/Clear'
//import Paper from "@material-ui/core/Paper";
//import ProfilePic from "../../pages/profilepicture/profilepic";
import Logo from "../../Assests/bslogo.jpeg";
//import Switch from "react-switch";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
//import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import MenuItem from '@mui/material/MenuItem';
//import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
//import Modal from '@mui/material/Modal';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  TextField,
} from "@material-ui/core";
import {
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState,useEffect } from "react";
const Navbar = () => {
  const email = localStorage.getItem("email");
  const[show,setShow] = useState(false);
  const[password,setPassword] = useState('');
  const [getRows, setRows] = useState([]);
  const [Data, setData] = useState([]);
  const [count, setcount] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadList();
    getLatestRowDetailscount();
  }, []);

  const loadList = async () => {
    const result = await axios.get(`http://localhost:8080/customer/getlatestrows/${email}`);
   setData(result.data.data);
 
  };
  const getLatestRowDetailscount = async () => {
    const res = await axios.get(`http://localhost:8080/customer/getlatestrowscount/${email}`);
  setcount(res.data.data);
 
  };
  const changeStatus = async () => {
    await axios.post(
      'http://localhost:8080/customer/changeViewStatus' 
    )
    .then(res => {

      if (res.status == 200) {
        console.log('inside 200');
        loadList();
        //localStorage.setItem('promolink','value');
       // console.log('local',localStorage.getItem('promolink'));
       
        //loadList();
        

      }
         
  
      })
  .catch((error) => {
      // catch any unexpected errors
     // setSuccess (false);
      console.log(error);


  })
 
 
  };
  const getLatestRowDetails = async () => {
    const results = await axios.get(`http://localhost:8080/customer/getlatestrows/${email}`);
   // console.log('re');
   localStorage.setItem('order',0);
    setData(results.data.data);
  };

  let navigate = useNavigate();
  const saveChanges = async () => { 
    // console.log('file obj',selectedFile);
    console.log('emai;',email);
    const user ={
      email:email,
      password:password,
    }
        await axios.post(
          'http://localhost:8080/customer/loggedinuser', user  
        )
        .then(res => {

          if (res.status == 200) {
            console.log('inside 200');
            navigate('/promotion');
          }
             
      
          })
      .catch((error) => {
          // catch any unexpected errors
         // setSuccess (false);
          console.log(error);


      })
       // setProfileData(response.data.data);
       // console.log("name", response.data.data);
   
  }
  
  const handleClose = () => {
    setShow(false)
    navigate('/profile');

  }  

  const viewNotificatons = () => {
    setVisible(true);
   getLatestRowDetails();
   getLatestRowDetailscount();

  }
  const closeRodal = () => {
    setVisible(false);
    changeStatus();
   
   //navigate('/profile');

  }  
  
  const unotifyMessage = async (id) =>{
    
    await axios.delete(
      `http://localhost:8080/customer/deletenotification/${id}`  
    )
    .then(res => {

      if (res.status == 200) {
        console.log('inside 200');
        //localStorage.setItem('promolink','value');
       // console.log('local',localStorage.getItem('promolink'));
       
        loadList();
        swal({
          title: "Deleted Successfully",
          text: "Notification deleted successfully",
          icon: "success",
          button: "OK",
        });

      }
         
  
      })
  .catch((error) => {
      // catch any unexpected errors
     // setSuccess (false);
      console.log(error);


  })
  }

  const cartDetails = () =>{
    
    navigate('/cart')
  }
  const openModal = () =>{
    var res = localStorage.getItem('count');
    if (res == 0) {
      setShow(true);
      localStorage.setItem('count',5666) 
    }
    
  }

  return (

    <>
        <div className="navbar-parent">
          <div className="child-navbar">
          <img src = {Logo} alt = 'image'  width={150}/>
          </div>
          <div className="shopping-cart" onClick={cartDetails} style={{cursor:'pointer'}}>
         
          <ShoppingCartIcon fontSize="large" className="shopping-cart-icon"/>
          </div>
          <div className="promotions-button" >
          <Button
                 style={{ borderRadius: 35,width: '130px',height: '40px',marginLeft: '40px' }}
                variant="outlined"
               disabled={localStorage.getItem('count').length > 1}
                onClick={()=>openModal()}
              >
              Promotions
              </Button>
          </div>
          <div  className="promotions-button" onClick={viewNotificatons}> 
                    <IconButton
                   
                    aria-label="show 17 new notifications"
                    color="inherit"
                    >
               
                    <Badge style={{width: '31px'}} badgeContent={localStorage.getItem('order') == 1 ? count.length === 0 ? null : count.length : null} color="error">
                        <NotificationsIcon  style = {{ fontSize: '40px'}}/>
                    </Badge>
                    </IconButton>
                    </div>
                 
        </div>
        <div className="navbar-parent-links">
        <div  className='child-navbar-links'>
   
      <Link to="/home" className='link-navbar'>Home</Link>
    
    </div>
    <div className='child-navbar-links'>
   
      <Link to="/aboutus" className='link-navbar'>Aboutus</Link>

    </div>
    <div className='child-navbar-links'>
    
      <Link to="/profile" className='link-navbar'>Profile</Link>

    </div>
    <div className='child-navbar-links'>
    
      <Link to="/category" className='link-navbar'>Categories</Link>

    </div>
{localStorage.getItem('count') > 1 ?
   <div className='child-navbar-links'>
    
      <Link to="/promotion" className='link-navbar'>Promotion</Link>

    </div>

:null}
   
    </div>
    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Password of your Outlook Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <div className="modal-child-div">
              <TextField
                className="modal-textinput"
                fullWidth
                name="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
              />
            </div>
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={visible} onHide={closeRodal} size="lg" >
        <Modal.Header>
          <Modal.Title>Recent Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Data.map((row) => 
  
  

<div style={{marginTop:'10px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<div style={{marginTop:'20px'}}>
<span style={{width:'190px'}}> {row.status == 'New' ? <FiberManualRecordIcon /> : null } </span> 
</div>

<div style={{marginTop:'20px'}}>
<h6 className="men-image-title">You have placesd order for    </h6> 
</div>
<div style={{marginTop:'20px'}}>
<span style={{color: "grey"}}> {row.name} </span>  
</div>
<div style={{marginTop:'20px'}}>
<span onClick={()=> unotifyMessage(row._id)} style={{color: "red",cursor:'pointer'}}> <ClearIcon /></span>
</div>
</div>

    
 
    


)}
           
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" color="error" onClick={closeRodal}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
      
        </>
    
  );
};
export default Navbar;
