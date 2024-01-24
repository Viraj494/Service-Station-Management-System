const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070 ; 

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGO_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Mongo connection Success");
})

const vehicleRouter = require("./routes/vehicle.js");
app.use("/vehicle", vehicleRouter);

const appointmentRouter = require("./routes/Appointments.js");
app.use("/appointment",appointmentRouter);

const cardRouter = require("./routes/cards.js");
app.use("/card", cardRouter);

const inquirieRouter = require("./routes/inquiries.js");
app.use("/inquirie", inquirieRouter);

const employeeRouter = require("./routes/employees.js");
app.use("/employee", employeeRouter);

const stockRouter = require("./routes/stocks.js");
app.use("/stock", stockRouter);

const supplierRouter = require("./routes/supplier.js");
app.use("/supplier", supplierRouter);

const serviceRouter = require("./Routes/ServiceRoutes.js")
app.use("/services", serviceRouter)

const customerRouter = require("./routes/customers.js");
app.use("/customer",customerRouter);

const reviewRouter = require("./routes/Reviews.js");
app.use("/reviews",reviewRouter);

const adminRouter = require("./routes/Admin.js");
app.use("/admin",adminRouter);


app.post('/customer', async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const customer = new customer({
            ...req.body,
            password: hashedPassword,
        });

        await customer.save();
        res.send(customer);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating customer');
    }
});

  //mLogin

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const customer = await customer.findOne({ email });
        if (!customer) {
            return res.status(400).send('Invalid email or password');
        }
        const isPasswordMatch = await bcrypt.compare(password, customer.password);
        if (!isPasswordMatch) {
            return res.status(400).send('Invalid email or password');
        }
        return res.status(200).json({ message: 'Login successful' })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in');
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
