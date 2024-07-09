const express = require('express'); 
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv')
dotenv.config()
//db
const {connectDB} = require('./config/db');

// port
const PORT = 5000;
JWT_SECRET = "flgj9%6uug9@fdfboi&y05r8g$fj"

// Initialize the app
const app = express();

//Middlewares

// Parse application/json
app.use(express.json());
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// enabling CORS for some specific origins only. 
const corsOptions = {
    origin: 'http://localhost:5173', // Remove trailing slash
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  }; 
   
app.use(cors(corsOptions)); // Allowing cross-origin requests on api's

// for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// initializing sessions
require('./config/passport');





// connecting to mongodbAtlas database 
connectDB()

//define all your routes here...............................
const userRoutes = require('./routes/authRoutes.js')
const productRoutes = require('./routes/productRoutes.js')




app.use("/auth/",userRoutes)
app.use("/api/",productRoutes)

app.get("/",(req, res)=>{
    res.json({message:"message"})
})




app.listen(PORT, () => {
    console.log(process.env.SESSION_SECRET)
    console.log(`Server running on http://localhost:${PORT}`);
});

