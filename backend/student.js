var mysql = require("mysql");

var students = class students {
  getAllStudents(con, req, res) {
    var sql = `SELECT 
        a.idstudent,
        a.First_Name, 
        a.Last_Name, 
        b.coll_name, 
        b.degree,
        b.major,
        b.pass_year
        FROM 
        student a, 
        student_edu b
        WHERE a.idstudent = b.idstudent and b.primary_edu = "Yes"`;
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
  students
};
