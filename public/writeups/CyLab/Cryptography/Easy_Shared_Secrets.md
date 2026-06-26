# CyLab - "Shared Secrets"
## Cryptography - Easy

---

### Study the Source Code

`message.txt` contains all the cryptographic parameters. Looking at `encryption.py`, then the encryption is a simple XOR:

```python
shared = pow(A, b, p)
enc = bytes([x ^ (shared % 256) for x in flag])
```

---

### Decrypt the Flag

XOR is its own inverse — applying the same mask twice returns the original (`x ^ y ^ y = x`), so decryption is identical to encryption:

```python
with open("message.txt", "r") as f:
    lines = f.readlines()

g   = int(lines[0].strip().split('=')[1])
p   = int(lines[1].strip().split('=')[1])
A   = int(lines[2].strip().split('=')[1])
b   = int(lines[3].strip().split('=')[1])
enc = bytes.fromhex(lines[4].strip().split('=')[1])

shared = pow(A, b, p)
print(bytes([x ^ (shared % 256) for x in enc]).decode())
```

Run the script and the flag prints directly to the terminal.