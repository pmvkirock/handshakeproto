var insert = class insert {
  insert_stud(con, body) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO student (First_Name, Last_Name, stud_password, email_ID, major) VALUES (";
    var sql1 =
      "'" +
      body.fname +
      "','" +
      body.lname +
      "','" +
      body.pass +
      "','" +
      body.email +
      "','" +
      body.sname +
      "')";
    console.log(sql + sql1);
    con.query(sql + sql1, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }

  insert_comp(con, body) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO company (company_name, company_location, password, email) VALUES (";
    var sql1 =
      "'" +
      body.cname +
      "','" +
      body.location +
      "','" +
      body.pass +
      "','" +
      body.email +
      "')";
    console.log(sql + sql1);
    con.query(sql + sql1, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }
};

module.exports = {
  insert
};
