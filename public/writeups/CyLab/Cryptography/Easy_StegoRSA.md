# CyLab - "StegoRSA"
## Cryptography - Easy

---

### Extract the Private Key

The title hints at steganography. The image itself looks normal, but checking its **metadata** (via an online tool for example) reveals a comment field containing a string of hex characters.

Paste it into [CyberChef](https://gchq.github.io/CyberChef/) and decode it from hex — the output is a private RSA key in `.pem` format.

---

### Decrypt the Flag

Save the key to a file:

```bash
nano private.pem   # paste the key that we got with cyberchef - including the headers
```

Then decrypt the encrypted file using `openssl`:

```bash
openssl pkeyutl -decrypt -inkey private.pem -in file.enc -out output.txt
```

The flag is in `output.txt`.