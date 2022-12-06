import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,useLocation } from 'react-router-dom';
import './modal.css'
import Profile from '../../pages/profilepicture/profilepic';
import About from '../../Assests/aboutus.webp';
import axios from 'axios';
import {
    Card,
    CardContent,
    Typography,
    Divider,
    CardMedia,
    TextField,
    IconButton,
  } from "@material-ui/core";


function Modaal() {
    const navigate = useNavigate();
    const {state} = useLocation();
    console.log('profi',state._id);
    const id = state._id;
  const [show, setShow] = useState(true);
  const [name, setName] = useState(state.name);
  const [email, settEmail] = useState(state.email);
  const [gender, setGender] = useState(state.gender);
  const [file, setFile] = useState('');
  const imageProp = {
    height: 250,
    width: 250,
  }; 

 const  onFileChange = (e) => {
    
    // Update the state
    setFile(e.target.files[0]);
  
  };
  const handleClose = () => {
      navigate('/profile');

    }   
    const handleChange = () => {
       // navigate('/profile');
  
      }
     const onFileUpload = () => {
    
        // Create an object of formData
        //const formData = new FormData();
      
        // Update the formData object
        //formData.append(
          //"myFile",
          //this.state.selectedFile,
          //this.state.selectedFile.name
        //);
      
        // Details of the uploaded file
     //   console.log(selectedFile);
      
        // Request made to the backend api
        // Send formData object
        //axios.post("api/uploadfile", formData);
      };
      const saveChanges = () => { 
      //  console.log('file obj',selectedFile);

        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("gender", gender);
        data.append("file", file);
 
        const updateData = async () => {
          await axios.post(
            `http://localhost:8080/customer/updateprofile/${id}`, data  
          )
          .then(res => {

            if (res.status == 200) {
              console.log('inside 200');
              console.log(res);
              navigate('/profile');
            }
               
        
            })
        .catch((error) => {
            // catch any unexpected errors
           // setSuccess (false);
            console.log(error);
  
  
        })
         // setProfileData(response.data.data);
         // console.log("name", response.data.data);
        };
       
        updateData();
    }
 // const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-parent">
            <div className="modal-child-div">
              <Profile imageProp={imageProp} />
              {/* <Button
                style={{ borderRadius: 20 }}
                onClick={onFileUpload}
                className="update-profilepic-button"
              >
                Update
              </Button> */}
              <div className='file-div'>
              <TextField type="file" onChange={onFileChange} />
              </div>
            </div>
            <div className="modal-child-div">
              <TextField
                className="modal-textinput"
                fullWidth
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
              />
            </div>
            <div className="modal-child-div">
              <TextField
                //value={name}
                className="modal-textinput"
                fullWidth
                name="email"
                value={email}
                onChange={(e) => settEmail(e.target.value)}
                label="Email"
              />
            </div>
            <div className="modal-child-div">
              <TextField
                //value={name}
                className="modal-textinput"
                fullWidth
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              />
            </div>
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
    </>
  );
}

export default Modaal;