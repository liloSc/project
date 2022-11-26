const VisPath = require('../models/vis-path');

module.exports.getPath = function (req, res) {
   res.json(VisPath.getPath(session.userid))
}
