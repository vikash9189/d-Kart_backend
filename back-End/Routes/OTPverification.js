const fast2sms = require('fast-two-sms')
const localProperty = require('../Properties');
const dotenv=require('dotenv').config({path:__dirname+'/.env'});
const APIKey = process.env.authorizationKey

function otpGenerator() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}

let deliverOTP = async (contactNumber) => {
  try {
    let otp = otpGenerator();
    var options = { authorization: APIKey, message: `Your otp for d-Kart account verification is ${otp}. ThankYou to be a part of d-Kart family!`, numbers: [contactNumber] }

    let sendOTP = await fast2sms.sendMessage(options);
    if(!sendOTP.return)
    {
      return { success: false, message:"Invalid phone number" };
    }
    return { success: true, OTP: otp ,sendOTP};
  } catch (error) {
    return { success: false, error };
  }


}

module.exports = deliverOTP