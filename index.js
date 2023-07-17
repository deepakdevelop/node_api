const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user_route=require("./routes/userRoute");
app.use('/api',user_route);
const port = process.env.PORT || 9000;

mongoose.connect("mongodb://localhost:27017/ecom-api",{

    //useCreateIndex:true,

    //useNewUrlParser:true,

    //useUnifiedTopology:true

}).then(() => {

    console.log("connection is successfull");

}).catch((e) => {

    console.log("no connection");

});


app.listen(port, () => {

    console.log(`connection is setup at port ${port}`);

})
