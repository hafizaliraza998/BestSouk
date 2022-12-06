//import "./App.css";
import React from 'react';
import axios from 'axios';
import ProfileIcon from '../../Assests/profileicon.png';
export default class ProfilePic extends React.Component {
  state = {
    profile: '',
    success : false
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/customer/profilepicture`,{ headers: {"Authorization" : localStorage.getItem('token')}})
      .then(res => {
        const persons = res.data.img;
        console.log('data',persons);
        if (persons != null) {
          this.setState({ profile:  persons});
        this.setState({ success:  true});
        }
        
      })
  }

  render() {
    var imagestr=this.state.profile;
    const { imageProp } = this.props
    console.log('props',imageProp);
    if (this.state.success) {
      console.log('success');
      imagestr = imagestr.replace("public", "");
    var profilePic="http://localhost:8080"+imagestr;
    }
    
   // console.log('ur', profilePic)
  
    return (
      <>
       {this.state.success ?  <img src = {profilePic } alt = 'de' width={imageProp.width} height={imageProp.height} style = {{borderRadius:'100px'}}/>
     
      :<img src = {ProfileIcon} alt = 'de' width={imageProp.width} height={imageProp.height} style = {{borderRadius:'100px'}}/>
    }
      </>
    )
  }
}

  