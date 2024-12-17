const express = require("express");
const cors = require('cors');
const { sequelize } = require("./models");
const adminRouter = require('./routes/admins');
const propertyRouter = require('./routes/properties');


const app = express();

//middlewares

app.use(express.json())
app.use(cors({origin: true}));


//routes

app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate(); // Check if the database connection is alive
    res.status(200).send('OK');
  } catch (err) {
    res.status(500).send('Database not ready');
  }
});

app.use('/api/admins', adminRouter);
app.use('/api/properties', propertyRouter);


app.listen(process.env.PORT || 8000, async () => {
  console.log("Server Successfully connneted!!");
  console.log("database connected!!");
});
