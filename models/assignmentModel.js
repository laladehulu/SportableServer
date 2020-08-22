const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
   title:String,

})
module.exports = mongoose.model("assignment",assignmentSchema);