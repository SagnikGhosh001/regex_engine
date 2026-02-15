export const matchOne = (pattern, text) => {
  if (!pattern) return true;
  if (!text) return false;
  if (pattern === ".") return true;
  return pattern === text;
};

export const match = (pattern, text) => {
  if (!pattern) return true;
  if (pattern === "$") return text === "";
  return matchOne(pattern[0], text[0]) &&
    match(pattern.slice(1), text.slice(1));
};
