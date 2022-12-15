
const User = require('./user')

/*module.exports = class VisPath {
    static getPath = function (userid) {
        if (User.existsUserid(userid)) {
            const username = User.getName(userid)
            return require('../data/' + username + "-path.json")
        } else {
            return { "path": [] }
        }
    }
}*/

module.exports = class VisPath {

    static getPath = function (userid,city) {
        if (User.existsUserid(userid)) {
           /*const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const place = urlParams.get('place')
            console.log("PLACE IS" + place);*/
          //  const place ="Paris";
            const username = User.getName(userid)
            return require('../data/' + username + "_" + city + "-path.json")
        } else {
            return { "path": [] }
        }
    }
}