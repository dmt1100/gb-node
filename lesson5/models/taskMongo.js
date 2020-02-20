const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSch = new Schema({
    title: {type: String, required: true},
    isSuccess: {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model('Task', taskSch, 'tasks');