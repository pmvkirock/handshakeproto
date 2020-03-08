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
};

module.exports = {
  company: company
};
