const mongoose = require('mongoose');
const config = require('config');
//const db = config.get('mongoURI');

//console.error(db);
const connectDB = async () => {
try {
  await mongoose.connect("mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=LocalMongoDB",{
    useUnifiedTopology: true,
  useCreateIndex: true
});

  console.log('MongoDB Connected...');
} catch(err) {
  console.error('false');
    console.error(err.message);

    process.exit(1);
}

}

module.exports = connectDB;