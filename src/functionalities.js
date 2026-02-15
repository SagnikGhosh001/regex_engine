export const matchOne = (pattern, text) => {
  if (!pattern) return true;
  if (!text) return false;
  if (pattern === ".") return true;
  return pattern === text;
};

export const search = (pattern, text) => {
  if (pattern[0] === "^") {
    return match(pattern.slice(1), text);
  }

  if (!pattern) return true;

  return text.split("").some((_, index) => match(pattern, text.slice(index)));
};

export const matchQuestion = (pattern, text) =>
  (matchOne(pattern[0], text[0]) && match(pattern.slice(2), text.slice(1))) ||
  match(pattern.slice(2), text);

export const matchStar = (pattern, text) =>
  (matchOne(pattern[0], text[0]) && match(pattern, text.slice(1))) ||
  match(pattern.slice(2), text);

export const match = (pattern, text) => {
  if (!pattern) return true;
  if (pattern === "$") return text === "";
  else if (pattern[1] === "?") return matchQuestion(pattern, text);
  else if (pattern[1] === "*") return matchStar(pattern, text);
  return matchOne(pattern[0], text[0]) &&
    match(pattern.slice(1), text.slice(1));
};
