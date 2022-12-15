const VisPath = require('../models/vis-path');

module.exports.getPath = function (req, res) {
  // console.log(req);
 //  console.log(req.query); // $_GET["id"]

   var url = require('url');
   var url_parts = url.parse(req.url, true);
  // console.log("City is: "+url_parts.query.city);
   var city=url_parts.query.city;
   res.json(VisPath.getPath(session.userid,city))
}
