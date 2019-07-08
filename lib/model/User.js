const db = require("../utils/mysql");
const errorUtils = require("../utils/error");

class User {
  constructor(user) {
    if (!user) {
      return;
    }

    this.id = user.id || null;
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

  validateEmailAddress() {
    const simpleEmailRegex = /\S+@\S+\.\S+/;

    return simpleEmailRegex.test(this.email);
  }

  validate() {
    if (!this.familyName || !this.familyName.length) {
      return errorUtils.validationError("familyName", "Field is required");
    }

    if (!this.givenName || !this.givenName.length) {
      return errorUtils.validationError("givenName", "Field is required");
    }

    if (!this.email) {
      return errorUtils.validationError("email", "Field is required");
    }

    if (!this.validateEmailAddress(this.email)) {
      return errorUtils.validationError("email", "Invalid Format");
    }

    return null;
  }

  save() {
    return new Promise((resolve, reject) => {
      const validationError = this.validate();

      if (validationError) {
        return reject(validationError);
      }

      const { email, givenName, familyName } = this;
      const sql = `INSERT INTO user (email, given_name, family_name) VALUES (?,?,?)`;

      db.query(sql, [email, givenName, familyName], (err, result) => {
        if (err) {
          reject(errorUtils.sqlError("SQL store error", err));
        }

        User.getById(result.insertId)
          .then(resolve)
          .catch(reject);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM user WHERE id = ?;`;

      db.query(sql, [id], (err, result) => {
        if (err) {
          return reject(errorUtils.sqlError("SQL store error", err));
        }

        if (!result || !result.length) {
          return reject(errorUtils.notFound("User not found"));
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

      db.query(sql, [mappedUpdates, id], (err) => {
        if (err) {
          reject(errorUtils.sqlError("SQL store error", err));
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

      db.query(sql, [id], (err, result) => {
        if (err) {
          reject(errorUtils.sqlError("SQL store error", err));
        }

        if (result.affectedRows === 0) {
          reject(errorUtils.notFound("User not found"));
        }

        resolve({ id });
      });
    });
  }
}

module.exports = User;