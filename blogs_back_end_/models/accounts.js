const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const accountsSchema = new Schema({

    email: {
        type: String, 
        require: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }

}, { timestamps: true });

const Account = mongoose.model('accounts', accountsSchema);

module.exports = Account;