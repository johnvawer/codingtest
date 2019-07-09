const { expect } = require("chai");

const {
  notFound,
  sqlError,
  validationError,
} = require("../../../lib/utils/error");

describe("error utility", function () {

  describe("notFound", function () {
    const notFoundError = notFound();
    const notFoundErrorWithMessage = notFound("Resource doesn't exist");

    it("should return an instance of Error", function () {
      expect(notFoundError instanceof Error).to.be.true;
    });

    it("should have a httpStatusCode of 404", function () {
      expect(notFoundError.httpStatusCode).to.equal(404);
    });

    it("should use default message if one not passed", function () {
      expect(notFoundError.message).to.equal("Requested resource not found");
    });

    it("should use passed message", function () {
      expect(notFoundErrorWithMessage.message).to.equal("Resource doesn't exist");
    });
  });

  describe("sqlError", function () {
    const sqlErrorError = sqlError();
    const sqlErrorWithMessage = sqlError("Store error", "err");

    it("should return an instance of Error", function () {
      expect(sqlErrorError instanceof Error).to.be.true;
    });

    it("should have a httpStatusCode of 500", function () {
      expect(sqlErrorError.httpStatusCode).to.equal(500);
    });

    it("should use default message if one not passed", function () {
      expect(sqlErrorError.message).to.equal("MYSQL error");
    });

    it("should use passed message", function () {
      expect(sqlErrorWithMessage.message).to.equal("Store error");
    });

    it("should attach original error if one is passed", function () {
      expect(sqlErrorWithMessage.originalError).to.equal("err");
    });
  });

  describe("validationError", function () {
    const validationErrorError = validationError("test field", "test validation error");
    const expectedErrorMsg = "Error on field: test field, test validation error";

    it("should return an instance of Error", function () {
      expect(validationErrorError instanceof Error).to.be.true;
    });

    it("should have a httpStatusCode of 400", function () {
      expect(validationErrorError.httpStatusCode).to.equal(400);
    });

    it("should return a formatted error message based on passed params", function () {
      expect(validationErrorError.message).to.equal(expectedErrorMsg);
    });
  });
});