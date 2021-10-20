require('dotenv').config()
require('express-async-errors')

//extra security packages
const helmet= require('helmet');
const cors=require('cors');
const xss=require('xss-clean');
const rateLimiter=require('express-rate-limit');


const express = require('express')
const app = express()

//connectDB
const connectDB=require('./db/connect');
const authenticationUser = require('./middleware/authentication');

//routers
const authRouter=require('./routes/auth');
const departmentsRouter=require('./routes/departments');
const doctorsRouter=require('./routes/doctors');
const amenitiesRouter=require('./routes/amenities');
const galleryRouter=require('./routes/gallery');
const reviewsRouter=require('./routes/reviews');

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middlewares

app.set('trust proxy',1);
app.use(rateLimiter({
  windowMs:15*60*1000, // 15 minutes
  max:100, // limit each IP to 100 requests per windowMs
}
));
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/auth',authRouter);
// app.use('/api/v1/jobs',authenticationUser,jobsRouter); //all of the jobs routes are secured routes,so we are using "authenticationUser" middleware for all of them
app.use('/api/v1/departments',departmentsRouter);
app.use('/api/v1/doctors',doctorsRouter);
app.use('/api/v1/amenities',amenitiesRouter);
app.use('/api/v1/gallery',galleryRouter);
app.use('/api/v1/reviews',reviewsRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
