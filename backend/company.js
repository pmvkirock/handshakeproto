var company = class company {
  getComp(con, req, res) {
    var sql = `SELECT * FROM company WHERE idcompany = ` + req.query.idcompany;
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    });
  }

  updatebasicinfo(con, req, res) {
    var obj = req.body.prof_pic
      .replace(/\\/g, "\\\\")
      .replace(/\$/g, "\\$")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
    var sql =
      `UPDATE 
      company 
      SET 
      company_name = '` +
      req.body.comp_name +
      `', 
      company_location = '` +
      req.body.location +
      `',
      company_description = '` +
      req.body.des +
      `',
      company_type = '` +
      req.body.type +
      `',
      noofemp = '` +
      req.body.no +
      `',
      website = '` +
      req.body.web +
      `',
      ownership = '` +
      req.body.owner +
      `',
      prof_pic = '` +
      obj +
      `',
      email = '` +
      req.body.email +
      `' WHERE 
      idcompany = ` +
      req.body.id;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      //console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }
};

module.exports = {
  company: company
};
