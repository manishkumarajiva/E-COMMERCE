const mongoose = require('mongoose');

const DB_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || 'mongodb://localhost:27017/test';

const DBconnection = (async() => {
    try {
        const connectionInstance = await mongoose.connect(DB_CONNECTION_STRING);
        console.log(`DATABASE CONNECTED :: ${connectionInstance.connection.host} :: ${connectionInstance.connection.port}`);
    } catch (error) {
        console.log(`DATABASE CONNECTION ERROR :: ${error}`)
    }
})()


module.exports = DBconnection;