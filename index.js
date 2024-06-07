require('dotenv').config();
const express = require('express');
const app = express();
const Port = process.env.PORT;
const tasks = require('./routes/tasks');
const connectDB = require('./db/connection');
const notFound = require('./middeleware/not-found');
const errorHandlerMiddleware = require('./middeleware/error-handler');



//middeleware 
app.use(express.static('./public'));
app.use(express.json());


// routes

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(Port, () => {
            console.log(`Server is listening on port ${Port}`)
        })
    } catch (error) {
        console.log('error: ', error);
    }
}

start();


