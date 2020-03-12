var jobs = class jobs {
  getAllJob(con, req, res) {
    var sql = `SELECT
    a.idjob, 
    a.job_title, 
    a.deadline, 
    a.location, 
    a.salary, 
    a.job_des, 
    a.job_cat, 
    a.paid, 
    b.idcompany,
    b.company_name, 
    b.email 
    FROM job a, company b 
    WHERE a.idcompany = b.idcompany`;
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }

  getJob(con, req, res) {
    var sql =
      `SELECT
    a.idjob, 
    a.job_title, 
    a.deadline, 
    a.location, 
    a.salary, 
    a.job_des, 
    a.job_cat, 
    a.paid, 
    b.idcompany,
    b.company_name, 
    b.email 
    FROM job a, company b 
    WHERE a.idcompany = b.idcompany and idjob =` + req.query.idjob;
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }

  getAppliedJob(con, req, res) {
    var sql =
      `SELECT
    a.idjob, 
    a.job_title, 
    a.deadline, 
    a.location, 
    a.salary, 
    a.job_des, 
    a.job_cat, 
    a.paid, 
    b.idcompany,
    b.company_name, 
    b.email,
    c.status 
    FROM job a, company b, application c 
    WHERE a.idcompany = b.idcompany and a.idjob = c.idjob and c.idstudent = '` +
      req.query.idstudent +
      `'`;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }

  getApplied(con, req, res) {
    var sql =
      `SELECT a.idstudent, a.First_Name, a.Last_Name, b.coll_name, b.degree, b.major, c.resume FROM 
      application c INNER JOIN student a ON a.idstudent = c.idstudent
      INNER JOIN student_edu b ON a.idstudent = b.idstudent
      WHERE b.primary_edu = 'Yes' AND c.idcompany =` +
      req.query.idcompany +
      ` AND c.idjob = ` +
      req.query.idjob;
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }

  apply_jobs(con, req, res) {
    var sql =
      "INSERT INTO application (idstudent, idcompany, idjob, resume, status) VALUES (";
    var sql1 =
      "'" +
      req.body.idstudent +
      "','" +
      req.body.idcompany +
      "','" +
      req.body.idjob +
      "','" +
      req.body.resume +
      "','" +
      req.body.status +
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

  updateJobs(con, req, res) {
    var sql =
      `UPDATE application SET status = '` +
      req.body.status +
      `' WHERE idcompany = ` +
      req.body.idcompany +
      ` AND idstudent = ` +
      req.body.idstudent +
      ` AND idjob = ` +
      req.body.idjob;
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
  jobs: jobs
};
