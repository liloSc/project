users = [
    { userid: 'fred@fred.com', password: '1234', username: 'fred' },
    { userid: 'vane@vane.com', password: '1234', username: 'vane' },
]


module.exports = class User {

    static verify = function (userid, password) {
        var flag = false;
        users.forEach(u => {
            if (u.userid == userid && u.password == password) {
                flag = true
            }
        });
        return flag
    }

    static existsUserid = function (userid) {
        var flag = false;
        users.forEach(u => {
            if (u.userid == userid) {
                flag = true
            }
        });
        return flag
    }

    static getName = function (userid) {
        var result = undefined;
        users.forEach(u => {
            if (u.userid == userid) {
                result = u.username
            }
        });
        return result
    }
}