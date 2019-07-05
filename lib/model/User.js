const db = require("../utils/mysql");

class User {
  constructor(user) {
    if (!user) {
      return;
    }

    this.id = user.id;
    this.email = user.email;
    this.givenName = user.givenName;
    this.familyName = user.familyName;

    //move into function
    if (user.createdAt) {
      this.created = user.createdAt instanceof Date ? user.createdAt : new Date(user.createdAt)
    } else {
      this.created = null;
    }
  }

  static mapDatabaseResult(record) {
    return new User({
      id: record.id,
      email: record.email,
      givenName: record.given_name,
      familyName: record.family_name,
      createdAt: record.created_at
    });
  }

  validate() {
    return null;
  }

  save() {
    return new Promise((resolve, reject) => {
      const { email, givenName, familyName } = this;
      const sql = `INSERT INTO user (email, given_name, family_name) VALUES (?,?,?)`;

      db.query(sql, [email, givenName, familyName], (err, result) => {
        if (err) {
          reject(new Error("Something went wrong"));
        }

        User.getById(result.insertId)
          .then(resolve)
          .catch(reject);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * from user WHERE id = ?;`;

      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err);
          return reject(new Error("Something went wrong"));
        }

        if (!result || !result.length) {
          return reject(new Error("User not found"));
        }

        resolve(User.mapDatabaseResult(result[0]));
      });
    });
  }

  static updateById(id, updates) {
    return new Promise((resolve, reject) => {
      const { email, givenName, familyName } = updates;

      let mappedUpdates = {};

      if (email) {
        mappedUpdates.email = email;
      }

      if (givenName) {
        mappedUpdates.given_name = givenName;
      }

      if (familyName) {
        mappedUpdates.family_name = familyName;
      }

      const sql = `UPDATE user SET ? WHERE id = ?;`;

      db.query(sql, [mappedUpdates, id], (err, result) => {
        if (err) {
          reject(new Error("Something went wrong"));
        }

        User.getById(id)
          .then(resolve)
          .catch(reject);
      });
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM user WHERE id = ?`;

      db.query(sql, [id], err => {
        if (err) {
          console.log(err);
          reject(new Error("Something went wrong"));
        }

        resolve({ id });
      });
    });
  }
}

module.exports = User;

//mocha
//sinon
//sinon-chai