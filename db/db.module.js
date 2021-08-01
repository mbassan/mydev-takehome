const mongoose = require("mongoose");

let connection;

function init() {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DB_CONNECTION || "mongodb://mongo/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    connection = mongoose.connection;

    connection.on("error", (err) => {
      console.error(err);
      reject();
    });
    connection.once("open", () => {
      resolve();
      console.log("DB Connected");
    });
  });
}

module.exports = {
  init,
};
