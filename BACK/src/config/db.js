import mongoose from 'mongoose';
import dns from 'node:dns/promises';

// ! important, fixes a problem with node DNS server, can't connect in all environments without this line. info in link:
//https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042/3
dns.setServers(['1.1.1.1', '1.0.0.1']);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('connected succesfully to DB');
  } catch (error) {
    console.log(process.env.DB_URL);
    console.log(`error connecting to DB: ${error}`);
  }
};

export default connectDB;
