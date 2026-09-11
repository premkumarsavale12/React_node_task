
import mongoose from 'mongoose';

const ConnectDb = async () => {

    try {

        await mongoose.connect("mongodb://localhost:27017/full_stack")
        console.log("Database Connected SuccessFully.....");

    }

    catch (err) {

        console.log(err);
        console.log('Mongodb Connection Failed...', err.message);
        process.exit(1);
    }
}
export default ConnectDb;