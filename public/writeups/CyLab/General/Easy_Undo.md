# CyLab - "Undo"
## General Skills - Easy

This challenge walks you through a series of classic encoding/decoding operations, each building on the last. Here are the key takeaways for each step.

---

### Base64

Base64 is a standard encoding scheme that can be decoded directly from the terminal using the built-in `base64` command:

```bash
base64 -d <<< "StringToDecode"
```

---

### Reverse String

To reverse a string, the `rev` command does the job cleanly:

```bash
rev <<< "StringToReverse"
```

---

### Character Replacement

While `sed` can handle word-level substitutions, this challenge specifically expects the `tr` command for character-by-character replacement. The syntax maps each character in the first set to the corresponding character in the second:

```bash
tr 'ab' 'cd'   # replaces 'a' → 'c' and 'b' → 'd'
```

---

### ROT13

The final step is ROT13, a Caesar cipher with a shift of 13 (e.g. `a → n`). It can also be reversed using `tr` by substituting the full alphabet with its shifted counterpart:

```bash
tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

> **Note:** ROT13 is its own inverse — applying it twice returns the original string, since 13 + 13 = 26.