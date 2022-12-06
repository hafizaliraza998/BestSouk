import React from 'react';
import {  Link } from "react-router-dom";
import './footer.css';
import Paper from "@material-ui/core/Paper";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';

const   Footer= () =>{
  return (
    <div className='footer-parent-all'>
    <Paper elevation={20}  className='footer-paper' style={{
      backgroundColor: "#003f5C",
    }}>   
    <div className='footer-row'>
    <div className='footer-column'>
    <div>
    <h4 className='footer-main-heading'>
        Find us
        </h4>
    </div>
    <div>
    <div className='location-parent'>
    <div>    
    <LocationOnIcon className='footer-icon'/>
    </div>
    <div>
    <span className='footer-text'>

        Park road, Comsats University, Islamabad
        </span>
        </div>

    </div>
    </div>
    <div>
    <div className='location-parent'>
    <div>    
    <PhoneIcon className='footer-icon'/>
    </div>
    <div>
    <span className='footer-text'>

       +92 348 7368167
        </span>
        </div>

    </div>
    </div>
    <div>
    <div className='location-parent'>
    <div>
    <span>  
    <EmailIcon className='footer-icon'/>
    </span>
    </div>
    <div>
    <span className='footer-text'>
       BestSouck@gmail.com
        </span>
        </div>

    </div>
    </div>
    <div>
    <div className='location-parent'>
    <div>
    <span>  
    <FacebookIcon className='footer-icon'/>
    </span>
    </div>
    <div>
    <span className='footer-text'>
       BestSouck
        </span>
        </div>

    </div>
    </div>
    </div>
    <div className='footer-column'>
    <div>
    <h4 className='footer-main-heading'>
    Web Scrapping
        </h4>
    </div>
    <div>
    <p className='footer-main-sub-heading'>
        Daraz Global
        </p>
    </div>
    <div>
    <p className='footer-main-sub-heading'>
        Daraz.pk
        </p>
    </div>
    <div>
    <p className='footer-main-sub-heading'>
        Ali Express
        </p>
    </div>
    <div>
    <p className='footer-main-sub-heading'>
        Golootlo
        </p>
    </div>
    </div>
    <div className='footer-column'>
    <div>
    <h4 className='footer-main-heading'>
    Quick Links
        </h4>
    </div>
    <div>
    <p className='footer-main-sub-heading'>
        Animation
        </p>
    </div>
    <div>
    <p className='footer-main-sub-heading'>
        Web Scrapping
        </p>
    </div>
    <div>
    <p className='footer-main-sub-heading'>
        MERN Development
        </p>
    </div>
    <div>
    <p className='footer-main-sub-heading'>
        Logo Designing
        </p>
    </div>
    </div>
    </div>
    <hr className='footer-hr'/>
    <div className='footer-copyright-div'>
    <span className = 'footer-copyright-text'>
        @2000 copyright | BestSouck.com
    </span>
    </div>

  </Paper>
  </div>
   
  );
}
export default Footer;