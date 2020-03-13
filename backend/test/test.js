var app = require("../server.js");
var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("Handshake App", function() {
  it("GET /getJob - Get Job", function(done) {
    agent
      .get("/getJobs?idjob=24")
      .then(function(res) {
        expect(res.body[0].job_title).to.equal("Data Engineer Intern");
        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it("GET /getSkillName- Get Skill", function(done) {
    agent
      .get("/getSkillName?stud_id=24")
      .then(function(res) {
        expect(res.body[0].skill_name).to.equal("Python");
        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it("GET /getEvents - Get Events", function(done) {
    agent
      .get("/getEvents?idevents=5")
      .then(function(res) {
        expect(res.body[0].event_name).to.equal("VLSI Design");
        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it("GET /getCompany - Get Company", function(done) {
    agent
      .get("/getCompany?idcompany=1")
      .then(function(res) {
        expect(res.body[0].company_name).to.equal("Apple Inc");
        done();
      })
      .catch(e => {
        done(e);
      });
  });
  it("GET /getApplied - Get Applied", function(done) {
    agent
      .get("/getApplied?idcompany=1&idjob=15")
      .then(function(res) {
        expect(res.body[0].First_Name).to.equal("Pranav");
        done();
      })
      .catch(e => {
        done(e);
      });
  });
});
