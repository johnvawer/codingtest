const chai = require("chai");

const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const proxyquire = require("proxyquire");

const expect = chai.expect;
chai.should();
chai.use(sinonChai);

const User = require("../../../lib/model/User");

describe("User Model", function () {
  it("should assign the properties passed in correctly", function () {
    const user = new User({
      email: "email@email.com",
      givenName: "test1",
      familyName: "test2"
    });

    expect(user.id).to.be.null;
    expect(user.email).to.equal("email@email.com");
    expect(user.givenName).to.equal("test1");
    expect(user.familyName).to.equal("test2");
    expect(user.created).to.be.null;
  });

  describe("mapDatabaseResult", function () {
    it("create a new instance of user based on a result from the database", function () {
      const createdDate = new Date();
      const user = User.mapDatabaseResult({
        id: 1,
        email: "test@test.com",
        given_name: "test1",
        family_name: "test2",
        created_at: createdDate
      });

      expect(user.id).to.equal(1);
      expect(user.email).to.equal("test@test.com");
      expect(user.givenName).to.equal("test1");
      expect(user.familyName).to.equal("test2");
      expect(user.created).to.equal(createdDate);
    })
  });

  describe("validateEmailAddress", function () {
    it("should fail if passed invalid format", function () {
      const user = new User({ email: "email@email", givenName: "test", familyName: "test" });
      const invalidEmailResult = user.validateEmailAddress();

      expect(invalidEmailResult).to.equal(false);
    });

    it("should pass if passed a valid format", function () {
      const user = new User({ email: "email@email.com", givenName: "test", familyName: "test" });
      const validEmailResult = user.validateEmailAddress();

      expect(validEmailResult).to.equal(true);
    });
  });

  describe("validate", function () {
    it("should fail if email is doesn't exist", function () {
      const user = new User({ email: "", givenName: "test", familyName: "test" })
      const validateResult = user.validate();
      expect(validateResult).to.not.be.null;

      const user2 = new User({ email: null, givenName: "test", familyName: "test" })
      const validateResult2 = user2.validate();
      expect(validateResult2).to.not.be.null;
    });

    it("should fail if givenName is blank", function () {
      const user = new User({ email: "email@email.com", givenName: "", familyName: "test" })
      const validateResult = user.validate();
      expect(validateResult).to.not.be.null;

      const user2 = new User({ email: "email@email.com", givenName: null, familyName: "test" })
      const validateResult2 = user2.validate();
      expect(validateResult2).to.not.be.null;
    });

    it("should fail if familyName is blank or null", function () {
      const user = new User({ email: "email@email.com", givenName: "test", familyName: "" })
      const validateResult = user.validate();
      expect(validateResult).to.not.be.null;

      const user2 = new User({ email: "email@email.com", givenName: "test", familyName: null })
      const validateResult2 = user2.validate();
      expect(validateResult2).to.not.be.null;
    });

    it("should pass if all values are provided and email is correct format", function () {
      const user = new User({ email: "email@email.com", givenName: "test", familyName: "test" })
      const validateResult = user.validate();
      expect(validateResult).to.be.null;
    });
  });

  describe("save", function () {
    it("should reject with an error if validation fails", async () => {
      const queryStub = sinon.stub().yields(null, { insertId: 1 });
      const proxyQuiredUser = proxyquire("../../../lib/model/User.js", {
        "../utils/mysql": {
          query: queryStub
        }
      });

      const user = new proxyQuiredUser();
      try {
        await user.save();
      } catch (e) {
        expect(e).to.not.be.null;
      }

      expect(queryStub).to.not.have.been.called;
    });
  });

  describe("getById", function () {
    it("should create correct sql", async () => {
      const queryStub = sinon.stub().yields(null, [{ id: 1 }]);
      const proxyQuiredUser = proxyquire("../../../lib/model/User.js", {
        "../utils/mysql": {
          query: queryStub
        }
      });

      await proxyQuiredUser.getById(1);
      expect(queryStub).to.have.been.calledOnceWith(
        "SELECT * FROM user WHERE id = ?;",
        [1]
      );
    });

    it("should resolve with a call to mapDatabaseResult", async () => {
      const queryStub = sinon.stub().yields(null, [{ id: 1 }]);
      const proxyQuiredUser = proxyquire("../../../lib/model/User.js", {
        "../utils/mysql": {
          query: queryStub
        }
      });

      sinon.stub(proxyQuiredUser, "mapDatabaseResult");
      proxyQuiredUser.mapDatabaseResult.returns({ id: 1 });
      const result = await proxyQuiredUser.getById(1);

      expect(proxyQuiredUser.mapDatabaseResult).to.have.been.calledWith({ id: 1 });
      expect(result).to.eql({ id: 1 });
    });
  });

  describe("deleteById", function () {
    it("should create correct sql", async () => {
      const queryStub = sinon.stub().yields(null, { affectedRows: 1 });
      const proxyQuiredUser = proxyquire("../../../lib/model/User.js", {
        "../utils/mysql": {
          query: queryStub
        }
      });

      await proxyQuiredUser.deleteById(1);
      expect(queryStub).to.have.been.calledOnceWith(
        "DELETE FROM user WHERE id = ?",
        [1]
      );
    });
  });
});