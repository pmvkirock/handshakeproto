const events = class events {
  getAllEvents(con, req, res) {
    var sql = `SELECT
    a.idevents, 
    a.event_name, 
    a.event_des, 
    a.location, 
    a.time, 
    a.date, 
    a.location, 
    a.eligibility, 
    b.idcompany,
    b.company_name, 
    b.email 
    FROM events a, company b 
    WHERE a.idcompany = b.idcompany ORDER BY a.date ASC`;
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }

  getEvents(con, req, res) {
    var sql =
      `SELECT
    a.idevents, 
    a.event_name, 
    a.event_des, 
    a.location, 
    a.time, 
    a.date, 
    a.location, 
    a.eligibility, 
    a.deadline,
    b.idcompany,
    b.company_name, 
    b.email 
    FROM events a, company b 
    WHERE a.idcompany = b.idcompany AND a.idevents = '` +
      req.query.idevents +
      `'`;
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }

  insertEvent(con, req, res) {
    var sql =
      `INSERT INTO events (idcompany, event_name, event_des, deadline, location, time, date, eligibility) VALUES (` +
      `'` +
      req.body.id +
      `','` +
      req.body.event_name +
      `','` +
      req.body.event_des +
      `','` +
      req.body.deadline +
      `','` +
      req.body.location +
      `','` +
      req.body.time +
      `','` +
      req.body.date +
      `','` +
      req.body.eligibility +
      `')`;
    console.log(sql);
    con.query(sql, function(err, result) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }

  getAppliedEvents(con, req, res) {
    var sql =
      `SELECT a.idstudent, a.First_Name, a.Last_Name, b.coll_name, b.degree, b.major FROM 
      application_event c INNER JOIN student a ON a.idstudent = c.idstudent
      INNER JOIN student_edu b ON a.idstudent = b.idstudent
      WHERE b.primary_edu = 'Yes' AND c.idcompany =` +
      req.query.idcompany +
      ` AND c.idevents = ` +
      req.query.idevents;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }

  apply_events(con, req, res) {
    var sql =
      "INSERT INTO application_event (idstudent, idcompany, idevents) VALUES (";
    var sql1 =
      "'" +
      req.body.idstudent +
      "','" +
      req.body.idcompany +
      "','" +
      req.body.idjob +
      "')";
    console.log(sql + sql1);
    con.query(sql + sql1, function(err, result) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }

  getMyEvents(con, req, res) {
    var sql =
      `SELECT
    a.idevents, 
    a.event_name, 
    a.deadline, 
    a.location, 
    a.eligibility, 
    a.event_des, 
    a.time, 
    a.date, 
    b.idcompany,
    b.company_name, 
    b.email 
    FROM events a, company b, application_event c 
    WHERE a.idcompany = b.idcompany and a.idevents = c.idevents and c.idstudent = ` +
      req.query.idstudent;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }
};

module.exports = {
  events: events
};
