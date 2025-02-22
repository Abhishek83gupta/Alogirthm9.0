const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 3000;
const connectDB = require('./dbconfig/db.js'); 


const cancerRoutes = require('./Routes/cancer.js');
const Diabetesroutre =require('./Routes/diabetes_rou');
const heartrouter = require('./Routes/heart_rou');
const liverrouter = require('./Routes/liver_rou');
const genralrouter = require('./Routes/genreal')


// Middleware
app.use(express.json());
app.use(cors({
    origin:"*"
}))
// db
connectDB(); // Call the function



// Routes
app.use('/api', cancerRoutes);
app.use('/api',Diabetesroutre);
app.use('/api',heartrouter);
app.use('/api',liverrouter);
app.use('/api', genralrouter);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});