// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError={
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  // it means it is some mongoose error

  //duplicate error
  if(err.code && err.code===11000){
    customError.msg=`Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode=400;
  }

  //validation error
  if(err.name==='ValidationError'){
    // err mein "errors" ek object hai
    //uss "error" object mein values wo h jo field provide ni ki user ne
    //to hum iterate kar rhe ek ek karke aur mongoose k hi message ko join kate jaa rahe
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',');
    customError.statusCode=400;
  }

  //cast error (.e syntax of id doesn't match as mongoose want)
  if(err.name==='CastError'){
    customError.msg=`No item found with id:${err.value}`;
    customError.statusCode=404;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg:customError.msg })
}

module.exports = errorHandlerMiddleware
