
const User = require('./user')


module.exports = class VisPath {
    static getPath = function(userid) {
        if(User.existsUserid(userid)){
            const username = User.getName(userid)
            return require('../data/' + username + "-path.json")
        } else {
            return {"path": []}
        }        
    }
}