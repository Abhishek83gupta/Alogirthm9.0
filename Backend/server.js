const express = require('express');
const app = express();
const PORT = 3000;
const connectDB = require('./dbconfig/db'); // Import the function


// const diabetesRoutes = require('./routes/diabetesRoutes');
// const cancerRoutes = require('./routes/cancerRoutes');
// const generalRoutes = require('./routes/generalRoutes');
// const heartRoutes = require('./routes/heartRoutes');

// const liverRoutes = require('./routes/liverRoutes');

const router = require('./Routes/healthcare');
// const Diabetesroutre=require('./Routes/diabetes_rou');
const heartrouter = require('./Routes/heart_rou');

const liverrouter = require('./Routes/liver_rou');

const genralrouter = require('./Routes/genreal')


// Middleware
app.use(express.json());

connectDB(); // Call the function



// Routes
app.use('/api', router);

// app.use('/api',Diabetesroutre);
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
