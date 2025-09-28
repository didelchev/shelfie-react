import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("X-Authorization")
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token) {
    return next();
  }
  
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET,)

  const user = { 
    _id: decodedToken._id,
    email: decodedToken.email
  }

  req.user = user
  req.isAuthenticated = true
  res.locals.userId = user._id;
  res.locals.userEmail = user.email;
  res.locals.isAuthenticated = true;

  return next()
    
  } catch (err) {
    if(err.name = 'TokenExpiredError'){
      return res.status(401).json({message: "Token expired !"})
    }else{
      return res.status(401).json({message: "Invalid token !"})
    }
  }
  
}

export const isAuth = (req, res, next) => {
  if(!req.isAuthenticated){
    return res.status(401).json({message: "Unauthorized !"})
  }
  return next()
}