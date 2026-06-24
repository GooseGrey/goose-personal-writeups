# CyLab - "Bytemancy 0"
## General Skills - Easy

### Studying the Script

Looking at the Python script running on the server, the logic is straightforward — it checks whether the user's input matches a precise sequence of bytes:

```python
if user_input == "\x65\x65\x65":
    print(open("./flag.txt", "r").read())
```

The server expects three time the byte `\x65` which correspond to the caracter `e`.

We can just connect to the server and give the input `eee` and get the flag !