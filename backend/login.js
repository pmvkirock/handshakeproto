var mysql = require("mysql");

var login = class login {
  login_stud(con, req, res) {
    console.log("Connected!");

    var sql =
      "SELECT a.First_Name, a.idstudent, a.stud_password, a.prof_pic, b.major FROM student a, student_edu b where email_ID = '" +
      req.body.username +
      "' and a.idstudent = b.idstudent and b.primary_edu = 'Yes'";
    var pass, id;
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      pass = result[0].stud_password;
      id = result[0].idstudent;

      if (pass === req.body.password) {
        res.cookie("cookie", id);
        console.log(res.cookie("cookie", id));

        res.writeHead(200, {
          "Content-Type": "text/plain"
        });

        res.end(JSON.stringify(result));
      } else {
        res.writeHead(401, {
          "Content-Type": "text/plain"
        });
        res.end("UnSuccessful Login");
      }
    });
  }

  login_comp(con, req, res) {
    console.log("Connected!");

    var sql =
      "SELECT idcompany, password FROM company where email = '" +
      req.body.username +
      "'";
    var pass, id;
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      console.log(result[0].idcompany);
      pass = result[0].password;
      id = result[0].idcompany;

      if (pass === req.body.password) {
        res.cookie("cookie", id, {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        req.session.user = id;
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("Successful Login");
      } else {
        res.writeHead(401, {
          "Content-Type": "text/plain"
        });
        res.end("UnSuccessful Login");
      }
    });
  }
};

module.exports = {
  login
};
