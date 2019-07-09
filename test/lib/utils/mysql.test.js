const chai = require("chai");

const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const proxyquire = require("proxyquire");

const expect = chai.expect;
chai.should();
chai.use(sinonChai);

describe("mysql util", function () {
  it("should create a new mysql pool", function () {
    const createPoolStub = sinon.stub().returns({});
    proxyquire("../../../lib/utils/mysql.js", {
      mysql: {
        createPool: createPoolStub
      }
    });

    expect(createPoolStub).to.have.been.calledOnce;
  })
});