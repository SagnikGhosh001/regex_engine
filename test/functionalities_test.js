import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

import {
  match,
  matchOne,
  matchQuestion,
  matchStar,
  search,
} from "../src/functionalities.js";

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

  describe("match - question mark branch", () => {
    describe("when pattern contains ?", () => {
      it("delegates to matchQuestion and matches correctly", () => {
        assertEquals(match("a?b", "ab"), true);
        assertEquals(match("a?b", "b"), true);
        assertEquals(match("a?b", "aab"), false);
      });
    });

    describe("when using optional wildcard", () => {
      it("handles .? correctly", () => {
        assertEquals(match(".?b", "ab"), true);
        assertEquals(match(".?b", "b"), true);
        assertEquals(match(".?b", "xb"), true);
      });
    });

    describe("when pattern has multiple optional characters", () => {
      it("matches correctly", () => {
        assertEquals(match("a?b?c", "abc"), true);
        assertEquals(match("a?b?c", "ac"), true);
        assertEquals(match("a?b?c", "bc"), true);
        assertEquals(match("a?b?c", "abbc"), false);
      });
    });

    describe("when pattern with ? is followed by end anchor", () => {
      it("respects remaining pattern", () => {
        assertEquals(match("a?$", "a"), true);
        assertEquals(match("a?$", ""), true);
        assertEquals(match("a?$", "aa"), false);
      });
    });
  });
  describe("match - star branch", () => {
    describe("when pattern contains *", () => {
      it("delegates to matchStar and matches correctly", () => {
        assertEquals(match("a*b", "b"), true);
        assertEquals(match("a*b", "ab"), true);
        assertEquals(match("a*b", "aaab"), true);
        assertEquals(match("a*b", "aac"), false);
      });
    });

    describe("when using .*", () => {
      it("matches any sequence including empty", () => {
        assertEquals(match(".*", ""), true);
        assertEquals(match(".*", "abc"), true);
        assertEquals(match(".*c", "abc"), true);
      });
    });

    describe("when multiple star patterns exist", () => {
      it("matches complex patterns correctly", () => {
        assertEquals(match("a*b*c", "aaabbbc"), true);
        assertEquals(match("a*b*c", "abc"), true);
        assertEquals(match("a*b*c", "c"), true);
        assertEquals(match("a*b*c", "abdc"), false);
      });
    });

    describe("when star pattern is followed by end anchor", () => {
      it("respects remaining pattern", () => {
        assertEquals(match("a*$", ""), true);
        assertEquals(match("a*$", "aaa"), true);
        assertEquals(match("a*$", "aaab"), false);
      });
    });
  });
});

describe("search", () => {
  describe('when pattern starts with "^"', () => {
    it("matches only at the beginning of the text", () => {
      assertEquals(search("^abc", "abc"), true);
      assertEquals(search("^abc", "abcdef"), true);
    });

    it("returns false if pattern is not at the start", () => {
      assertEquals(search("^abc", "zabc"), false);
      assertEquals(search("^a", "ba"), false);
    });
  });

  describe("when pattern does not start with '^'", () => {
    it("finds match anywhere in text", () => {
      assertEquals(search("abc", "zabc"), true);
      assertEquals(search("bc", "abc"), true);
      assertEquals(search("c", "abc"), true);
    });

    it("returns false when pattern does not exist in text", () => {
      assertEquals(search("xyz", "abc"), false);
      assertEquals(search("d", "abc"), false);
    });
  });

  describe("with dot wildcard", () => {
    it("matches using '.' inside text", () => {
      assertEquals(search("a.c", "zzabczz"), true);
      assertEquals(search(".b", "abc"), true);
    });
  });

  describe("with end anchor '$'", () => {
    it("matches pattern at the end of text", () => {
      assertEquals(search("abc$", "zzabc"), true);
    });

    it("does not match if text continues after '$' pattern", () => {
      assertEquals(search("abc$", "zzabcd"), false);
    });
  });

  describe("edge cases", () => {
    it("returns true for empty pattern", () => {
      assertEquals(search("", "abc"), true);
      assertEquals(search("", ""), true);
    });

    it.ignore("returns false when text is empty and pattern is non-empty", () => {
      assertEquals(search("a", ""), false);
      assertEquals(search("^a", ""), false);
    });
  });
});

describe("matchQuestion", () => {
  describe("when the character before ? matches and is consumed", () => {
    it("matches once and continues with remaining pattern", () => {
      assertEquals(matchQuestion("a?b", "ab"), true);
      assertEquals(matchQuestion("a?b", "b"), true);
    });
  });

  describe("when the character before ? does not match", () => {
    it("skips the optional character", () => {
      assertEquals(matchQuestion("a?b", "b"), true);
      assertEquals(matchQuestion("a?b", "ab"), true);
    });
  });

  describe("when optional character is present multiple times", () => {
    it("matches only one occurrence", () => {
      assertEquals(matchQuestion("a?b", "aab"), false);
    });
  });

  describe("when pattern uses .? (optional wildcard)", () => {
    it("matches with or without one character", () => {
      assertEquals(matchQuestion(".?b", "ab"), true);
      assertEquals(matchQuestion(".?b", "b"), true);
    });
  });

  describe("when neither branch matches", () => {
    it("returns false", () => {
      assertEquals(matchQuestion("a?b", "ac"), false);
      assertEquals(matchQuestion("a?b", "xyz"), false);
    });
  });
});

describe("matchStar", () => {
  describe("when character before * appears zero times", () => {
    it("skips the character and continues matching", () => {
      assertEquals(matchStar("a*b", "b"), true);
      assertEquals(matchStar("a*b", "ab"), true);
    });
  });

  describe("when character before * appears one time", () => {
    it("matches and consumes one character", () => {
      assertEquals(matchStar("a*b", "ab"), true);
    });
  });

  describe("when character before * appears multiple times", () => {
    it("matches all occurrences", () => {
      assertEquals(matchStar("a*b", "aaab"), true);
      assertEquals(matchStar("a*b", "aaaaab"), true);
    });
  });

  describe("when using .* (wildcard star)", () => {
    it("matches any sequence of characters", () => {
      assertEquals(matchStar(".*b", "ab"), true);
      assertEquals(matchStar(".*b", "xyzb"), true);
      assertEquals(matchStar(".*b", "b"), true);
    });
  });

  describe("when pattern does not match", () => {
    it("returns false", () => {
      assertEquals(matchStar("a*b", "aac"), false);
      assertEquals(matchStar("a*b", "xyz"), false);
    });
  });
});
