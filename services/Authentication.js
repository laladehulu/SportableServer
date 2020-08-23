const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");
class Authentication{   
    constructor(){

    }
    GetUserFromJwtMiddleware(){

    }
   async UserFromJwtMiddleware(req,res,next){
       console.log(req.cookies);
        if(!req.cookies.token){res.send("no token")}
        const token = req.body.token;//get the jwt token from the header bearer token
        console.log(token);
        let verifiedToken;
        try{
             verifiedToken=  jwt.verify(token,"ljkadkawdad");
             //console.log(verifiedToken);
             //set the user to the found user;
            req.jwtTokenData = verifiedToken.data;//will be used by the userfromJwt middleware
             req.foundUser = await userModel.findById(verifiedToken.data._id);
             if(!req.foundUser){
                 res.send("cant find user");
             }
             next();
        }
       
        catch(e){
            console.log(e);
            return res.send("invalid token");
        }
        
    }
    async Signup(user){
        console.log(user);
        var createdUser = await userModel.create({
            email:user.email,
            password:this.hashPassword(user.password),
            name:user.name
        })
        var token = this.generateToken(user);
        return token;
    }
    hashPassword(password){
        return password;
    }
    comparetoHashedPassword(password,hashedPassword){
        if(password === hashedPassword){
            return true;
        }
        return false;
    }
    async login(user){
        var foundUser = await userModel.findOne({email:user.email});
        console.log(foundUser);
        
        if(!foundUser){
            throw "Cant FInd user";
        }
        console.log("form password",user.password);
        console.log("saved",foundUser.password);
        if(this.comparetoHashedPassword(user.password,foundUser.password)){
            return this.generateToken(user);
        }
        else{
            throw "Invalid Password";
        }
    }
    generateToken(user){
        const data = {
            _id: user._id,
            name:user.name,
            email: user.email
        }
        const signature ="ljkadkawdad";//environment variable
        const expiration = "100h";
        return jwt.sign({ data, }, signature, { expiresIn: expiration });
    }
}


module.exports = new Authentication();