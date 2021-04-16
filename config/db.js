const mongoose = require('mongoose');

const doMongo = () => {
    const uri = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
    return mongoose.connect(process.env.MONGO_URI, uri)
        .then(done => console.log('Successfully connected to the Data Base'))
        .catch(err => console.log('An err occured in connecting to the Data Base' + err))

}
module.exports = {
    doMongo
};