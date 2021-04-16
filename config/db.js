const mongoose = require('mongoose');
const uri = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
        mongoose.connect(`${process.env.URL}/${process.env.DbName}`, uri)
        .then(done => console.log('Successfully connected to the Data Base'))
        .catch(err => console.log('An err occured in connecting to the Data Base' + err))

module.exports = mongoose