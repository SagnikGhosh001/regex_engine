# 🧠 Mini Regex Engine (Deno)

A lightweight regular expression engine built from scratch in JavaScript using
recursion.

This project implements basic regex functionality including:

- `.` → match any single character
- `?` → optional (0 or 1 occurrence)
- `*` → zero or more occurrences
- `^` → start anchor
- `$` → end anchor

Built for learning and understanding how regex engines work internally.

---

## 🚀 Features

| Pattern | Description                    |
| ------- | ------------------------------ |
| `.`     | Matches any single character   |
| `a?`    | Matches `a` zero or one time   |
| `a*`    | Matches `a` zero or more times |
| `^`     | Match at beginning of text     |
| `$`     | Match at end of text           |

---

## 📁 Project Structure

```
.
├── main.js
└── src/
    └── functionalities.js
```

- `functionalities.js` → core regex engine logic
- `main.js` → CLI entry point

---

## 🛠 Installation

Make sure you have **Deno** installed:

```bash
deno --version
```

---

## ▶️ Usage

Run the engine from the command line:

```bash
deno run main.js "<pattern>" "<text>"
```

### Examples

#### Basic matching

```bash
deno run main.js "a*b" "aaab"
```

Output:

```
true
```

---

#### Using start anchor

```bash
deno run main.js "^a*b" "aaab"
```

Output:

```
true
```

---

#### Using end anchor

```bash
deno run main.js "a*b$" "aaab"
```

Output:

```
true
```

---

#### No match

```bash
deno run main.js "a*b" "xyz"
```

Output:

```
false
```

---

## 🧩 How It Works

The engine is built using recursive pattern matching.

### Core Functions

- `matchOne` → compares a single character
- `matchQuestion` → handles `?`
- `matchStar` → handles `*`
- `match` → recursive pattern engine
- `regexMatch` → public entry point (handles `^` and scanning)

### Matching Flow

```
regexMatch → match → matchStar / matchQuestion → match → ...
```

The engine tries all possible paths recursively for `*` and `?`.

---

## 🧪 Running Tests

If you have tests written in BDD style, run them with:

```bash
deno test
```

---

## 📚 Educational Purpose

This project is meant to:

- Understand how regex engines work internally
- Practice recursion
- Learn pattern matching logic
- Explore backtracking algorithms

---

## ⚠️ Limitations

This is not a full regex engine.

Not supported:

- `+` operator
- Character classes `[abc]`
- Groups `( )`
- Alternation `|`
- Escaping `\`
- Performance optimizations (can be exponential in some cases)

---

## 🏗 Possible Improvements

- Add `+` operator
- Add character classes
- Add grouping and alternation
- Convert to NFA-based implementation
- Improve performance to avoid exponential backtracking

---
