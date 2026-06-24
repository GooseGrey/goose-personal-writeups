# CyLab - "Piece By Piece"
## General Skills - Easy

---

### Connect via SSH

```bash
ssh -p <PORT> ctf-player@dolphin-cove.picoctf.net
```

---

### Read the Instructions

```bash
cat instructions.txt
```

The instructions reveal that the flag is split across multiple parts of a zip file that need to be reassembled.

---

### Reassemble & Fix the Zip

Concatenate all the parts together:

```bash
cat part_a* > part_corrupted.zip
```

Then repair the zip file:

```bash
zip -F part_corrupted.zip --out part.zip
```

---

### Extract the Flag

Unzip using the password provided in the instructions:

```bash
unzip part.zip
```

The flag is inside!
