const { expect } = require("chai");

const {
  notFound,
  sqlError,
  validationError,
} = require("../../../lib/utils/error");

describe("error utility", () => {

  describe("notFound", () => {
    const notFoundError = notFound();
    const notFoundErrorWithMessage = notFound("Resource doesn't exist");

    it("should return an instance of Error", () => {
      expect(notFoundError instanceof Error).to.be.true;
    });

    it("should have a httpStatusCode of 404", () => {
      expect(notFoundError.httpStatusCode).to.equal(404);
    });

    it("should use default message if one not passed", () => {
      expect(notFoundError.message).to.equal("Requested resource not found");
    });

    it("should use passed message", () => {
      expect(notFoundErrorWithMessage.message).to.equal("Resource doesn't exist");
    });
  });

  describe("sqlError", () => {
    const sqlErrorError = sqlError();
    const sqlErrorWithMessage = sqlError("Store error", "err");

    it("should return an instance of Error", () => {
      expect(sqlErrorError instanceof Error).to.be.true;
    });

    it("should have a httpStatusCode of 500", () => {
      expect(sqlErrorError.httpStatusCode).to.equal(500);
    });

    it("should use default message if one not passed", () => {
      expect(sqlErrorError.message).to.equal("MYSQL error");
    });

    it("should use passed message", () => {
      expect(sqlErrorWithMessage.message).to.equal("Store error");
    });

    it("should attach original error if one is passed", () => {
      expect(sqlErrorWithMessage.originalError).to.equal("err");
    });
  });

  describe("validationError", () => {
    const validationErrorError = validationError("test field", "test validation error");
    const expectedErrorMsg = "Error on field: test field, test validation error";

    it("should return an instance of Error", () => {
      expect(validationErrorError instanceof Error).to.be.true;
    });

    it("should have a httpStatusCode of 400", () => {
      expect(validationErrorError.httpStatusCode).to.equal(400);
    });

    it("should return a formatted error message based on passed params", () => {
      expect(validationErrorError.message).to.equal(expectedErrorMsg);
    });
  });
});