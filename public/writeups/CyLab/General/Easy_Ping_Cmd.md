# CyLab - "Ping-cmd"
## General Skills - Easy

The challenge description hints that the server runs `ping` on our input and only accepts the Google DNS address — a classic setup for **command injection**.

---

### The Vulnerability

The server likely concatenates our input directly into a shell command like:

```bash
ping <user_input>
```

The `;` character in bash allows chaining commands, so anything after it will execute independently.

---

### Exploiting It

First, list the server's current directory while satisfying the ping input:

```bash
google.com; ls
```

`flag.txt` is right there. Read it with:

```bash
google.com; cat flag.txt
```

The flag is printed directly in the server's response.