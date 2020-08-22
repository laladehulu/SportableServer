const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
   teacher:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]

})
module.exports = mongoose.model("class",classSchema);