var mysql = require("mysql");

//connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_mgmt",
});

con.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log(`Connected To MYSQL`);
});

module.exports = con;
