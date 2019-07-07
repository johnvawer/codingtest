const errorUtils = require("../utils/error");
const db = require("../utils/mysql");
const User = require("../model/User");

class Users {
  static async findAll() {
    return new Promise((resolve, reject) => {
      let userQuery = `SELECT * FROM user;`;

      db.query(userQuery, (err, results) => {
        if (err) {
          return reject(errorUtils.validationError("SQL store error", err));
        }

        const mappedResults = results.map(User.mapDatabaseResult);

        return resolve(mappedResults);
      });
    });
  }
}

module.exports = Users;