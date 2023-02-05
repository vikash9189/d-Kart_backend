const localProperty = require('../../Properties')
const jwt = localProperty.Property.jwt;
const dotenv=require('dotenv').config({path:__dirname+'/.env'});
const fetchUser = (req, res, next) => {
    try {
        const auth_token = req.header("auth-token");
        const getUser = jwt.verify(auth_token, process.env.jwtSecret);
        req.user = getUser;
        next();

    } catch (error) {
        return res.status(401).json({success:false, error});
    }


}

module.exports = fetchUser;