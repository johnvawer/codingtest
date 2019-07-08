const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const expect = chai.expect;
chai.use(sinonChai);

const errorHandler = require("../../../lib/middleware/errorHandler");

describe("error handler middleware", () => {
  beforeEach(function () {
    res = {};
    res.json = sinon.fake.returns(res);
    res.status = sinon.fake.returns(res);
  });

  it("should use a default status code of 500 if httpStatusCode is not set", function () {
    const err = new Error();

    errorHandler(err, null, res, null);
    expect(res.status).calledOnceWithExactly(500);
  });

  it("should output a default message if httpStatusCode is not set", function () {
    const err = new Error("Test Error");

    errorHandler(err, null, res, null);
    expect(res.json).calledOnceWith({ success: false, error: "An unexpected error occured" });
  });

  it("should use the httpStatusCode if one is present on the error object", function () {
    const err = new Error("Test error");
    err.httpStatusCode = 400;

    errorHandler(err, null, res, null);
    expect(res.status).calledOnceWithExactly(400);
  });

  it("should output the message on the error if httpStatusCode is set", function () {
    const err = new Error("Test error");
    err.httpStatusCode = 400;

    errorHandler(err, null, res, null);
    expect(res.json).calledOnceWith({ success: false, error: "Test error" });
  });
});