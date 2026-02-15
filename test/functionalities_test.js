import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

import { matchOne } from "../src/functionalities.js";

describe("matchOne", () => {
  describe("when pattern is empty", () => {
    it("returns true regardless of text", () => {
      assertEquals(matchOne("", "a"), true);
      assertEquals(matchOne("", ""), true);
      assertEquals(matchOne("", "anything"), true);
    });
  });

  describe("when text is empty but pattern is not", () => {
    it("returns false", () => {
      assertEquals(matchOne("a", ""), false);
      assertEquals(matchOne(".", ""), false);
    });
  });

  describe('when pattern is "."', () => {
    it("matches any single character", () => {
      assertEquals(matchOne(".", "a"), true);
      assertEquals(matchOne(".", "z"), true);
      assertEquals(matchOne(".", "1"), true);
    });
  });

  describe("when pattern equals text", () => {
    it("returns true", () => {
      assertEquals(matchOne("a", "a"), true);
      assertEquals(matchOne("b", "b"), true);
      assertEquals(matchOne("1", "1"), true);
    });
  });

  describe("when pattern does not equal text", () => {
    it("returns false", () => {
      assertEquals(matchOne("a", "b"), false);
      assertEquals(matchOne("x", "y"), false);
      assertEquals(matchOne("1", "2"), false);
    });
  });
});
