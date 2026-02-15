import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

import { match, matchOne } from "../src/functionalities.js";

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

describe("match", () => {
  describe("when pattern is empty", () => {
    it("returns true for empty text", () => {
      assertEquals(match("", ""), true);
    });

    it("returns true even if text is not empty", () => {
      assertEquals(match("", "abc"), true);
    });
  });

  describe("exact matching", () => {
    it("returns true for identical strings", () => {
      assertEquals(match("a", "a"), true);
      assertEquals(match("abc", "abc"), true);
      assertEquals(match("123", "123"), true);
    });

    it("returns false for different strings", () => {
      assertEquals(match("a", "b"), false);
      assertEquals(match("abc", "abd"), false);
    });
  });

  describe('dot "." wildcard behavior', () => {
    it("matches any single character", () => {
      assertEquals(match(".", "a"), true);
      assertEquals(match(".", "z"), true);
      assertEquals(match(".", "1"), true);
    });

    it("works inside longer patterns", () => {
      assertEquals(match("a.c", "abc"), true);
      assertEquals(match("a.c", "axc"), true);
    });
  });

  describe("length mismatches", () => {
    it("returns false when pattern is longer than text", () => {
      assertEquals(match("abc", "ab"), false);
    });

    it("returns true when text is longer than pattern but matches", () => {
      assertEquals(match("ab", "abc"), true);
    });
  });

  describe("complex cases", () => {
    it("returns true when all characters match including wildcards", () => {
      assertEquals(match("a..d", "abcd"), true);
    });

    it("returns false if any character does not match", () => {
      assertEquals(match("a..d", "abce"), false);
    });
  });

  describe('end anchor "$"', () => {
    it('matches when pattern is "$" and text is empty', () => {
      assertEquals(match("$", ""), true);
    });

    it('does not match when pattern is "$" and text is not empty', () => {
      assertEquals(match("$", "a"), false);
      assertEquals(match("$", "abc"), false);
    });

    it('matches when "$" appears at the end of a matching pattern', () => {
      assertEquals(match("abc$", "abc"), true);
    });

    it('does not match when "$" appears at the end but text continues', () => {
      assertEquals(match("abc$", "abcd"), false);
    });

    it('does not treat "$" as a wildcard character', () => {
      assertEquals(match("$", "$"), false);
    });
  });
});
