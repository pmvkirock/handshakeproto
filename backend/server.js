const express = require("express");
const app = express();
const port = 8000;
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var mysql = require("mysql");
app.set("view engine", "ejs");
app.use("/prof_pic", express.static("public/uploads"));
app.use(cookieParser());

const multer = require("multer");

const comp = require("./company");
const stud_profile = require("./profile");
const insert = require("./insert");
const login = require("./login");
const jobs = require("./jobs");
const students = require("./student");
const events = require("./events");
app.get("/", (req, res) => res.send("Hello World!"));

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

//use express session to maintain session data
app.use(
  session({
    secret: "CMPELab1",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, `${new Date()}-${file.fieldname}.${file.mimetype.split("/")[1]}`);
  }
});

upload = multer({ storage });

app.post("/files", upload.single("file"), (req, res) => {
  console.log("Req Body : ", req.body);
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.end(`${new Date()}-${req.body.name}`);
});

var con = mysql.createConnection({
  host: "handshake.cvs3lkhbibqb.us-east-2.rds.amazonaws.com",
  user: "root",
  password: "Pranav96",
  database: "handshake"
});

app.post("/signupStud", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_stud(con, req.body, res);
});

app.post("/signupComp", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_comp(con, req.body, res);
});

//Route to handle Post Request Call
app.post("/loginStud", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_stud(con, req, res);
});

app.post("/loginComp", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_comp(con, req, res);
});

app.post("/stud_profile", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.getbasicinfo(con, req, res);
});

app.post("/stud_edu", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.geteduinfo(con, req, res);
});

app.post("/stud_exp", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.getexpinfo(con, req, res);
});

app.post("/updatePersonal", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.updatebasicinfo(con, req, res);
});

app.post("/updateContact", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.updatecontactinfo(con, req, res);
});

app.post("/updateEduInfo", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.updateeduinfo(con, req, res);
});

app.post("/updateExpInfo", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.updateexpinfo(con, req, res);
});

app.post("/insertExpInfo", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.insertexpinfo(con, req, res);
});

app.post("/insertEduInfo", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.inserteduinfo(con, req, res);
});

app.post("/deleteEduInfo", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.deleteeduinfo(con, req, res);
});

app.post("/deleteExpInfo", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.deleteeduinfo(con, req, res);
});

app.get("/getCompany", function(req, res) {
  console.log("Req Body : ", req.query);
  var get = new comp.company();
  get.getComp(con, req, res);
});

app.post("/updateCompany", function(req, res) {
  console.log("Req Body : ", req.body);
  var get = new comp.company();
  get.updatebasicinfo(con, req, res);
});

app.get("/getAllJobs", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new jobs.jobs();
  job.getAllJob(con, req, res);
});

app.get("/getJobs", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new jobs.jobs();
  job.getJob(con, req, res);
});

app.post("/insertAppli", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new jobs.jobs();
  job.apply_jobs(con, req, res);
});

app.post("/insertJob", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new jobs.jobs();
  job.insertJob(con, req, res);
});

app.get("/getAllStudents", function(req, res) {
  console.log("Req Body : ", req.body);
  var student = new students.students();
  student.getAllStudents(con, req, res);
});

app.get("/getApplied", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new jobs.jobs();
  job.getApplied(con, req, res);
});

app.get("/getAppliedJobs", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new jobs.jobs();
  job.getAppliedJob(con, req, res);
});

app.post("/updateApplied", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new jobs.jobs();
  job.updateJobs(con, req, res);
});

app.get("/getAllEvents", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new events.events();
  job.getAllEvents(con, req, res);
});

app.get("/getEvents", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new events.events();
  job.getEvents(con, req, res);
});

app.post("/insertEvent", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new events.events();
  job.insertEvent(con, req, res);
});

app.post("/insertAppliEvents", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new events.events();
  job.apply_events(con, req, res);
});

app.get("/getAppliedEvents", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new events.events();
  job.getAppliedEvents(con, req, res);
});

app.get("/getMyEvents", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new events.events();
  job.getMyEvents(con, req, res);
});

app.get("/getSkill", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new stud_profile.profile();
  job.getskillinfo(con, req, res);
});

app.get("/getSkillName", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new students.students();
  job.getskillinfo(con, req, res);
});

app.post("/insertSkill", function(req, res) {
  console.log("Req Body : ", req.body);
  var job = new stud_profile.profile();
  job.insertskillinfo(con, req, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
