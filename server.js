const mysql = require("mysql2");

process.on("uncaughtException", (err) => {
  //*this should be in the top of code so there is no uncaught error before it
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! shutting down");
  process.exit(1); //*0 for sucess and 1 for exception
});

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "pass123",
  database: "hospital",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDELED REJECTION! shutting down");
  server.close(() => {
    process.exit(1); //*0 for sucess and 1 for exception
  });
});
