# CyLab - "Bytemancy 1"
## General Skills - Easy

This challenge teaches you about bash pipelining by requiring you to send a very specific input to a remote server.

---

### Studying the Script

Looking at the Python script running on the server, the logic is straightforward — it checks whether the user's input matches a precise sequence of bytes:

```python
if user_input == "\x65" * 1751:
    print(open("./flag.txt", "r").read())
```

The server expects **1751 repetitions of the byte `\x65`**. Typing this manually is obviously not an option — that's where pipelining comes in.

---

### Pipelining in Bash

The trick is to generate the input and pipe it directly into `nc`, which forwards it to the server's stdin as if you had typed it yourself.

```bash
python3 -c "print('\x65' * 1751)" | nc <SERVER_IP> <PORT>
```

The server receives the input, the condition is satisfied, and the flag is printed back to your terminal!