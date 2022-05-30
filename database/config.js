const mongoose = require('mongoose')

const db = process.env.MONGODB_CNN;
    
const dbConnection = async () => {
    try {
    //console.log(db);
    await mongoose.connect(`${db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Base de datos Online');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};


module.exports = {
    dbConnection
}

