const auth = require("../middleware/auth");
var express = require("express");
const Stripe = require('stripe')('sk_test_51M6USXEwmBqyBd5JS06rKZ4orZEB2c3UPLNGEVzjb3dA9qC0y7jrkCw493SoM10h0wIbaV7Mo7RecMvqVOEbeHKd00SaisrfWR');
var router = express.Router();
var customer = require("../models/customer");
var Otp = require("../models/otp");
var MenWear = require("../models/MenWear");
var WomenWear = require("../models/WomenWear");
var Accessories = require("../models/accessories");
var Fragrances = require("../models/fragrances");
var Products = require("../models/products");
var Cart = require("../models/cart");
var Order = require("../models/order");
var LoggedIn = require("../models/loggedinuser");
var NotiSchema = require("../models/notification");
var Promotion = require("../models/promotion");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");

const csvtojson = require("csvtojson");
const order = require("../models/order");
//const csvFilePath=require('../menswear.csv');
//var nodemailer = require("nodemailer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
router.get("/", function (req, res, next) {
  res.send("respond with a customer");
});
router.post("/register", upload.single("img"), async (req, res) => {
  const { name, email, gender, password, confirm_password } = req.body;
  console.log("details", name, email, gender);
  //console.log('img',req.file);

  const encryptedPassword = await bcrypt.hash(password, 10);
  const encryptedConfirmPassword = await bcrypt.hash(confirm_password, 10);
  try {
    const oldUser = await customer.findOne({ email: email });
    console.log("old user", oldUser);

    if (oldUser) {
      console.log("old user", oldUser);
      return res.status(400).send({ message: "User Already Exist" });
      //return res.json({ error: 'User already exist' });
    }
    await customer.create({
      name,
      //  img: req.file.path,
      email,
      gender,
      password: encryptedPassword,
      confirm_password: encryptedConfirmPassword,
    });
    res.status(200).send({ message: "Sign up successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "User aalready Exist" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await customer.findOne({ email: email });
  if (!user) {
    console.log("not found");
    return res.status(400).send({ message: "Invalid Username or password" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      console.log("token", token);
      return res
        .status(200)
        .send({ message: "Login successfully", data: token });
    } else {
      return res.status(400).send({ message: "Invalid username or password" });
    }
  }
  res.status(400).send({ message: "Invalid username or password" });
});
router.get("/allcustomer", auth, async (req, res) => {
  console.log("inside all cuss");
  const cust = await customer.findOne({ email: req.user });
  console.log("user all cust", cust);
  res.status(200).send({
    data: cust,
  });
});
router.get("/profilepicture", auth, async (req, res) => {
  console.log("insid pic");
  const cust = await customer.findOne({ email: req.user });
  console.log("profile", cust);
  res.status(200).send({
    img: cust.img,
  });
});

router.post("/updateprofile/:id", upload.single("file"), async (req, res) => {
  const {
    file,
    body: { name, email, gender },
  } = req;
  // console.log('file',file);

  const id = req.params.id;
  console.log("user id", id);
  // const { name, email,gender} = req.body;

  try {
    const cust = await customer.findOne({ _id: id });
    if (cust) {
      if (name != null) {
        // console.log(' user',cust);
        cust.name = name;
      } else {
        // console.log(' user',cust);
        cust.name = cust.name;
      }
      if (file != null) {
        // console.log(' user',cust);
        cust.img = file.path;
      } else {
        // console.log(' user',cust);
        cust.img = cust.img;
      }
      if (email != null) {
        // console.log(' user',cust);
        cust.email = email;
      } else {
        // console.log(' user',cust);
        cust.email = cust.email;
      }
      if (gender != null) {
        // console.log(' user',cust);
        cust.gender = gender;
      } else {
        // console.log(' user',cust);
        cust.gender = cust.gender;
      }
    }
    await cust.save();
    return res.status(200).send({ message: "great " });
  } catch (error) {
    // console.log('inside if');

    console.log(error);
    return res.status(400).send({ message: "Error hai " });
  }
});

router.post("/addmenwear", async (req, res) => {
  // const { email, password } = req.body;
  csvtojson()
    .fromFile("menswear.csv")
    .then((csvData) => {
      console.log(csvData);
      MenWear.insertMany(csvData)
        .then(function () {
          console.log("data inseted");
          res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});
router.get("/verifyroute",auth, async (req, res) => {
  console.log("inside verifyroute");
  
});
router.get("/wear/:data", async (req, res) => {
  console.log("inside all men wear");
  const category = req.params.data
console.log('cat',category);
console.log('query',req.query);
var arr = [];
if (req.query.price == 0) {
  req.query.price = 2000000; 
}
if (req.query.selectedOption == '') {
  req.query.selectedOption = 'name'; 
}
if (req.query.sort == '    ') {
  req.query.sort = 1; 
}
console.log(req.query.selectedOption);
console.log(req.query.sort);
console.log(req.query.price);
console.log(req.query.search);
const men = await Products.find({category:category,name:{$regex: req.query.search,$options: 'i'}});
//console.log('men',men);
const filtered = men.map((men, i) => {
  var result = men.price.match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g);
  result =  result.map(n => Number(n.replace(/,/g, '')));
  result = parseInt(result)
  //  console.log('result',result);
    if (result < req.query.price) {
      arr.push(men)
    }
    
    
  });

const resu = arr.map((men, i) => {
  var result = men.price.match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g);
  result =  result.map(n => Number(n.replace(/,/g, '')));
  result = parseInt(result)
    console.log('result',result); 
 return men.price = result;
  
});


if (req.query.selectedOption == 'price') {
  if (req.query.sort == 1) {
    arr.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));  
  }
  else {
    arr.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));  
  }
  
  
}
else {

  if (req.query.sort == 1) {
    arr.sort((a, b) => a.name.localeCompare(b.name));  
  }
  else {
    arr.sort((a, b) => b.name.localeCompare(a.name));  
  }
 
}
console.log("filtered", arr);
console.log(arr.length);
  return res.status(200).send({
    data: arr
 });




 
});
router.post("/addwomenwear", async (req, res) => {
  // const { email, password } = req.body;
  csvtojson()
    .fromFile("womenswear.csv")
    .then((csvData) => {
      console.log(csvData);
      WomenWear.insertMany(csvData)
        .then(function () {
          console.log("data inseted");
          res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});
router.post("/addtocart", async (req, res) => {
const { email,name,img,price } = req.body;
 console.log('nane is',name);
await Cart.create({
  email,
  name,
  img,
  price
});
return res.status(200).send({ message: "Cart Filled" });

  
});
router.post("/loggedinuser", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log('name is',req.body);
  await LoggedIn.create({
    email:email,
    password:password
   
  });
  return res.status(200).send({ message: "User logged in" });
  
    
  });
  router.delete("/deleteloggedinuser/:email", async (req, res) => {
    const email = req.params.email;
   // const password = req.body.password;
    // console.log('name is',req.body);
   let result = await LoggedIn.deleteOne( { email: email } ) 
    await Promotion.remove( {} )
    return res.status(200).send({ message: "User deleted" });
    
      
    });
    router.delete("/deletecartitem/:id", async (req, res) => {
      const id = req.params.id;
     // const password = req.body.password;
      // console.log('name is',req.body);
     let result = await Cart.deleteOne( { _id: id } ) 
      return res.status(200).send({ message: "User deleted" });
      
        
      });
    router.delete("/deletenotification/:id", async (req, res) => {
      const id = req.params.id;
     // const password = req.body.password;
      // console.log('name is',req.body);
     const result = await NotiSchema.findByIdAndDelete( { _id: id }) 
     console.log(result);     
      return res.status(200).send({ message: "Unotified" });
      
        
      });
    router.delete("/clearhistory/:email", async (req, res) => {
      const email = req.params.email;
     // const password = req.body.password;
      // console.log('name is',req.body);
     let result = await Order.deleteMany( { email: email } ) 
      return res.status(200).send({ message: "User deleted" });
      
        
      });
router.get("/womenwear", async (req, res) => {
  console.log("inside all women wear");
  const women = await WomenWear.find({});
  console.log("women", women);
  res.status(200).send({
    data: women,
  });
});
router.get("/viewcart/:email", async (req, res) => {
  const email = req.params.email;
  console.log('email',email);
  const cart = await Cart.find({email:email,status:'cart'});
  console.log('cart',cart);
  if (cart) {
    return res.status(200).send({
      data: cart,
    });
  }
    else{
      return res.status(400).send({
        message: 'cart is empty',
      });
  }
  
 
});
router.get("/promotions/:email", async (req, res) => {
  const email = req.params.email;
  console.log('email',email);
  const promotion = await Promotion.find({email:email});
  console.log('promotion',promotion);
  if (promotion) {
    return res.status(200).send({
      data: promotion,
    });
  }
    else{
      return res.status(400).send({
        message: 'cart is empty',
      });
  }
  
 
});
router.get("/orderdetails/:email", async (req, res) => {
  //console.log("inside all women wear");
  const email = req.params.email;
  console.log('email',email);
  const orders = await Order.find({email:email});
  console.log("orders list", orders);
  if (orders) {
    return res.status(200).send({
      data: orders,
    });
  }
    else{
      return res.status(400).send({
      message: 'no order placed yet',
      });
  }
  
});
router.get("/getlatestrows/:email", async (req, res) => {
  //console.log("inside all women wear");
  const email = req.params.email;
  console.log('email',email);
  const orders = await NotiSchema.find({notify:true,email:email}).sort( { status: 1,name: 1 } );
  console.log("notify list", orders);
  if (orders) {
    return res.status(200).send({
      data: orders,
    });
  }
    else{
      return res.status(400).send({
      message: 'no order placed yet',
      });
  }
  
});
router.get("/getlatestrowscount/:email", async (req, res) => {
  //console.log("inside all women wear");
  const email = req.params.email;
  const orders = await NotiSchema.find({status:'New',email:email});
  console.log("orders list", orders);
  if (orders.length > 0) {
    return res.status(200).send({
      data: orders,
    });
  }
    else{
      return res.status(400).send({
      message: 'no order placed yet',
      });
  }
  
});
router.get("/search/:data",async (req,resp)=>{
  console.log(req.params.data);
  let dataa = await Products.find(
      {
          "$and":[
              {name:{$regex:req.params.data,$options: 'i'}},
              {category:'men'}
          ]
      }
  )
  resp.send(dataa);

});
router.get("/searchw/:data",async (req,resp)=>{
  console.log(req.params.data);
  let dataa = await Products.find(
      {
          "$and":[
              {name:{$regex:req.params.data,$options: 'i'}},
              {category:'women'}
          ]
      }
  )
  resp.send(dataa);

});
router.get("/searcha/:data",async (req,resp)=>{
  console.log(req.params.data);
  let dataa = await Products.find(
      {
          "$and":[
              {name:{$regex:req.params.data,$options: 'i'}},
              {category:'accessories'}
          ]
      }
  )
  resp.send(dataa);

});
router.get("/searchk/:data",async (req,resp)=>{
  console.log(req.params.data);
  let dataa = await Products.find(
      {
          "$and":[
              {name:{$regex:req.params.data,$options: 'i'}},
              {category:'youngsters'}
          ]
      }
  )
  resp.send(dataa);

});
router.post("/changeViewStatus", async (req, res) => {
  //console.log("inside all women wear");
   await NotiSchema.updateMany(
    { notify: true },
    { $set: { status : 'Old'} }
 );
  
    return res.status(200).send({
      message: 'changed',
    });
 
  });
router.post("/addaccessories", async (req, res) => {
  // const { email, password } = req.body;
  csvtojson()
    .fromFile("accessorize.csv")
    .then((csvData) => {
      console.log(csvData);
      Accessories.insertMany(csvData)
        .then(function () {
          console.log("data inseted");
          res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});
router.get("/accessories", async (req, res) => {
  console.log("inside all  accessories");
  const accessories = await Accessories.find({});
  console.log("Access", accessories);
  res.status(200).send({
    data: accessories,
  });
});
router.post("/addfragrances", async (req, res) => {
  // const { email, password } = req.body;
  csvtojson()
    .fromFile("fragrances.csv")
    .then((csvData) => {
      console.log(csvData);
      Fragrances.insertMany(csvData)
        .then(function () {
          console.log("data inseted");
          res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});
router.get("/fragrances", async (req, res) => {
  console.log("inside all  fragrances");
  const fragrances = await Fragrances.find({});
  console.log("Access", fragrances);
  res.status(200).send({
    data: fragrances,
  });
});

router.post("/sendemail/:em", async (req, res) => {

  var em = req.params.em;
  console.log(em);
  if (em!= req.body.email) {
    return res.status(400).send({ message: "Email Address is not found" });
    
  }
  const user = await customer.findOne({ email: em });
  console.log('send email user',user);
  if (user) {
    const otp = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: em,
      otp: otp,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    console.log("otpdata", otpData);
    await otpData.save();
    mailer(otp);
    return res.status(200).send({ message: "data saved in otp" });
  } else {
    return res.status(400).send({ message: "Email Address is not found" });
  }
});
router.put("/forgetpassword", async (req, res) => {
  const { email, password, otp } = req.body;
  console.log(email, password);
  const data = await Otp.findOne({ email: email, otp: otp });
  console.log("exp", data.expireIn);
  if (data) {
    console.log("user", data);
    let currentTime = new Date().getTime();
    console.log("current", currentTime);
    console.log("exp", data.expireIn);
    let diff = data.expireIn - currentTime;
    console.log("diff", diff);
    if (diff < 0) {
      return res.status(400).send({ message: "OTP Expired" });
    } else {
      let user = await customer.findOne({ email: email });
      const encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      user.confirm_password = encryptedPassword;
      await user.save();
      return res.status(200).send({ message: "Password changed successfully" });
    }
  } else {
    console.log("invalid");
    return res.status(400).send({ message: "Invalid OTP" });
  }
});
router.post('/payment/:id', async (req, res) => {

  let id = req.params.id
  const token = req.body;
  let status, error;
   try {
     await Stripe.charges.create({
       source: token.id,
       amount:token.price,
       currency: 'usd',
     });
     //console.log('count',count);
     let result = await Order.create({
      name:token.name,
      img: token.img,
      price: token.price,
      email:token.email,
      address:token.card.address_line1,
    });
    let res = await NotiSchema.create({
      
      email:token.email,
      name:token.name,
      notify :true,
      status  :'New',
    });
  
    await Cart.findByIdAndUpdate({_id:id},{"status": "order"});
 
    

     status = 'success';
   } catch (error) {
     console.log(error);
     status = 'Failure';
   }
   res.json({ error, status });
});

const mailer = async (code) => {
  var nodemailer = require("nodemailer");
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false, // true for 465, false for other ports
       logger: true,
     debug: true,
      secureConnection: false,
      auth: {
        user: "marsalanmalik455@gmail.com", // generated ethereal user
        pass: "nvzcbqbfqfqzmunv", // generated ethereal password
      },
      tls: {
        rejectUnAuthorized: true,
      },
    });

    var info = await transporter.sendMail({
      from: "mobasil786@outlook.com", // sender address
      to: "mobasil786@outlook.com", // list of receivers
      subject: "OTP Code", // Subject line
      text: `${code}`, // plain text body
      // html: output, // html body
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = router;
