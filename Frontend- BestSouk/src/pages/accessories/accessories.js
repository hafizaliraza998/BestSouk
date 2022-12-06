import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./acccessories.css";
import Lottie from "react-lottie";
import dataa from "../../data.json";
import Navbar from "../../Components/navbar/navbar";
import Paper from "@material-ui/core/Paper";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fade from "react-reveal/Rotate";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import Footer from "../../Components/footer/footer";
//import ProfilePic from "../profilepicture/profilepic";
import { Button } from "@material-ui/core";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
//import InputRange from 'react-input-range';
//import ReactRangeSlider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import Slider from 'react-rangeslider'
import Select from 'react-select';
import 'react-dropdown/style.css';
//import ScrollAnimation from 'react-animate-on-scroll';

const Accessories = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [menData, setMenData] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [value, setValues] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [search, setSearch] = useState('');
  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(menData.length / usersPerPage);
  const options = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
  ];
  const options1 = [
    { value: 1, label: 'Ascending' },
    { value: 0, label: 'Decending' },
  ];
  useEffect(() => {
  

    MenWearData();
  }, [value,selectedOption,selectedOption1,search]);
  const MenWearData = async () => {
  
    const data = 'accessories';
    const url = `${`http://localhost:8080/customer/wear/${data}`}?selectedOption=${selectedOption}&sort=${selectedOption1}
    &price=${value}&search=${search}`;
    let response = await axios.get(url);
    setMenData(response.data.data);
    //console.log("men data", response.data.data);
    RemovePKR(response.data.data)


  };
  
  
const RemovePKR =  (data) => {
    console.log('data',data);
    const removed = data.map((men, i) => {
      var result = men.price.match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g);
      result =  result.map(n => Number(n.replace(/,/g, '')));
      result = parseInt(result)
        console.log('result',result); 
     return men.price = result;
      
    });
    setMenData(data);
  
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

const addtoCart = async  (men) =>{
  console.log('men',men);
  men.email = email;
 

 
       
          await axios.post(
            'http://localhost:8080/customer/addtocart', men  
          )
          .then(res => {

            if (res.status == 200) {
              console.log('inside 200');
              swal({
                title: "Cart",
                text: "Successfully added in cart",
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
         // setProfileData(response.data.data);
         // console.log("name", response.data.data);
        };



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dataa,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleChange = async (event) =>{
    console.warn(event.target.value)
  setSearch (event.target.value);
  //   if (data) {
  //     await axios.get(
  //       `http://localhost:8080/customer/search/${data}`  
  //   )
  //   .then(res => {

  //     if (res.status == 200) {
  //       console.log('i',res.data);
      
  //       setMenData(res.data)

  //     }
         
  
  //     })
  // .catch((error) => {
  //     // catch any unexpected errors
  //    // setSuccess (false);
  //     console.log(error);


  // })
  //   }
  //   else {
  //     MenWearData();
  //   }


  }
 
  return (
    <>
    <Fade top left>
          <ToastContainer />
            <Navbar />
            <div className="search-icon">
            <input type='text' className="border" placeholder="Search" onChange={handleChange}/>
            </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'70px',marginBottom:'70px'}}> 
           <div style={{width:'300px'}}> 
            <Slider
       onChange={e => setValues(e)}
        value={value}
        min = {0}
        max = {10000}
        className = 'RangeSlider'
      />
      </div>
      <div style={{width:'300px'}}>
      <Select
        defaultValue={selectedOption}
        onChange={(choice) => setSelectedOption(choice.value)}
        options={options}
        value = {selectedOption.value} 
        placeholder = "Sort ..."
      />
      </div>  
      <div style={{width:'300px'}}>
      <Select
        defaultValue={selectedOption1}
        onChange={(choice) => setSelectedOption1(choice.value)}
        options={options1}
        value = {selectedOption1.value}
        placeholder = "Order By.." 
      />
      </div>  
      </div> 
           
      

      {menData && menData.length > 0 ? (

        <>
        <h1 className='link-navbar' style={{textAlign:'center',marginTop:'40px'}}>Choose Price Filtering and Sorting</h1>
        

          
            {
            menData.slice(pagesVisited, pagesVisited + usersPerPage)
            .map((men,index) => 
            <div className="web-scrape-images">
   
            <Paper 
        className='men-paper'
        key= {index}
        elevation = {20}>
         <div className="scrape-images">
         <div style={{marginTop:'60px'}}>
        <h5 className="men-image-title">{men.name} </h5>
        <h6 className = 'men-image-price'>PKR {men.price} </h6>
        <Button
                style={{ borderRadius: 20 }}
                color="primary"
                variant="contained"
                className="menwear-addtocart-button"
               onClick={() => addtoCart(men)}
              >
                Add to Cart
              </Button>
              
              </div>
              
              <div>
        <img src =  {men.img} alt = 'image' className="men-imges" height={250} width={500}/>
       
        </div>
       
        </div>
        
           
              
        </Paper>
       
        </div>
       )}
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
           
        </>
      ) : (
        <h1 style = {{textAlign:'center',marginTop:'100px',marginBottom:'100px'}}>Result Not Found</h1>
      )}
      <Footer />
            
            </Fade>
    </>
  );
};
export default Accessories;