const mongose = require("mongoose");
const { variable } = require("./variables");


const databaseInit = () => {
  mongose
    .connect(variable.mongoConnectUrl, {
      dbName: "warehouse",
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((e)=>{
        console.log(e);
    })}

    module.exports=databaseInit