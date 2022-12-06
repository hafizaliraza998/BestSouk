const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
  const auth = (req, res, next) => {
    console.log('inside auth');
    try{
    const token = req.header("Authorization");
    console.log('token in auth',token);
    if(!token) return res.status(401).json({msg: "No authentication token, access denied"});
    const verified = jwt.verify(token, JWT_SECRET);
    if(!verified) return res.status(401).json({msg: "Token verification failed, authorization denied"});
    req.user = verified.email;
    console.log('verified id is',req.user);
    next();
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    }
    module.exports = auth;