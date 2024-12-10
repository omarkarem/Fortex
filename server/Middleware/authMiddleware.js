import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "Secret_key";

export const authenticateToken = (req,res,next)=>{
    const token = req.body.token || req.headers["authorization"]?.split(" ")[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token,secretKey,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};