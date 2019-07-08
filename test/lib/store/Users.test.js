const chai = require("chai");

const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const proxyquire = require("proxyquire");

const expect = chai.expect;
chai.should();
chai.use(sinonChai);

describe("User Store", () => {
  describe("findAll", () => {
    it("should create correct sql", async () => {
      const fromDatabaseStub = sinon.stub().returns({ email: "email@email.com" });
      const queryStub = sinon.stub().yields(null, []);
      const proxyQuiredUsersStore = proxyquire("../../../lib/store/Users.js", {
        "../model/User": {
          fromDatabase: fromDatabaseStub
        },
        "../utils/mysql": {
          query: queryStub
        }
      });

      await proxyQuiredUsersStore.findAll();
      expect(queryStub).to.have.been.calledOnceWith("SELECT * FROM user;");
    });

    it("should sql errors", async () => {
      const fromDatabaseStub = sinon.stub().returns({ email: "email@email.com" });
      const queryStub = sinon.stub().yields("ERR");
      const proxyQuiredUsersStore = proxyquire("../../../lib/store/Users.js", {
        "../model/User": {
          fromDatabase: fromDatabaseStub
        },
        "../utils/mysql": {
          query: queryStub
        }
      });

      try {
        await proxyQuiredUsersStore.findAll();
      } catch (e) {
        expect(e).to.not.be.null;
      }

      expect(queryStub).to.have.been.called;
    });
  });
});