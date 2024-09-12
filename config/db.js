const mongoose  = require('mongoose');

const connectDB = async ()=> {
    const conn= await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDb Connected: ${conn.connection.host}`.cyan.underline.bold);
}

// connectDB()
//     .then(() => console.log(`MongoDb Connected: ${conn.connection.host}`))
//     .catch(err => console.error(err));

module.exports = connectDB;