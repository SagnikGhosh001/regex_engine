import { regexMatch } from "./src/functionalities.js";

const isMatch = regexMatch(Deno.args[0] || "", Deno.args[1] || "");
console.log(isMatch);
