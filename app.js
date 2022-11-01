const express = require("express");
const app = express();
const BuildingMgmt = require('./routes/building-route/building_mgmt')
const OfficeMgmt = require('./routes/office-route/office_mgmt')
const DepartmentMgmt = require('./routes/department-route/department_mgmt')
const DivisionMgmt = require('./routes/division-route/division_mgmt')
const EmployeeMgmt = require('./routes/employee-route/employee_mgmt')
const ProjectMgmt = require('./routes/project-route/project_mgmt')

// Require the package
var cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

//Define request response in root URL (/)
app.get('/', (req, res)=> {
  res.send('App running successfully!')
})

app.use('/building', BuildingMgmt)
app.use('/office', OfficeMgmt)
app.use('/department', DepartmentMgmt)
app.use('/division', DivisionMgmt)
app.use('/employee', EmployeeMgmt)
app.use('/project', ProjectMgmt);

module.exports = app;
