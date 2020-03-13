var mysql = require("mysql");

var students = class students {
  getAllStudents(con, req, res) {
    var sql = `
    (SELECT DISTINCT
      a.idstudent,
      a.First_Name, 
      a.Last_Name, 
      b.coll_name,
      b.degree,
      b.major,
      b.pass_year,
      GROUP_CONCAT(c.skill_name) as skill
      FROM 
      student a 
      INNER JOIN student_edu b ON a.idstudent = b.idstudent
      INNER JOIN student_skills c ON a.idstudent = c.idstudent
      WHERE  b.primary_edu = 'Yes'
      GROUP BY a.idstudent) UNION 
    (SELECT DISTINCT
      a.idstudent,
      a.First_Name, 
      a.Last_Name, 
      b.coll_name,
      b.degree,
      b.major,
      b.pass_year,
      "" as skill
      FROM 
      student a 
      INNER JOIN student_edu b ON a.idstudent = b.idstudent
      WHERE b.primary_edu = 'Yes' AND a.idstudent not in (SELECT idstudent FROM student_skills))`;
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }

  getskillinfo(con, req, res) {
    var sql =
      "SELECT skill_name FROM student_skills where idstudent = '" +
      req.query.stud_id +
      "'";
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }
};

module.exports = {
  students
};
