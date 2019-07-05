const db = require("../utils/mysql");

class Users {
  static async findAll() {
    return new Promise((resolve, reject) => {
      let userQuery = `SELECT * FROM user;`;

      db.query(userQuery, (err, results) => {
        if (err) {
          return reject(new Error("Its broke"));
        }

        return resolve(results);
      });
    });
  }
}

module.exports = Users;