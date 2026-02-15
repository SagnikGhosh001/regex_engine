export const matchOne = (pattern, text) => {
  if (!pattern) return true;
  if (!text) return false;
  if (pattern === ".") return true;
  return pattern === text;
};
