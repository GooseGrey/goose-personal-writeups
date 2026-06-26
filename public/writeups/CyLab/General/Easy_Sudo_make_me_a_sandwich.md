# CyLab - "Sudo Emacs"
## General Skills - Easy

---

### Connect via SSH

```bash
ssh -p <PORT> ctf-player@dolphin-cove.picoctf.net
```

`flag.txt` is visible but only readable by `root`.

---

### Check Sudo Permissions

```bash
sudo -l
```

The output shows that `ctf-player` can run `emacs` with `sudo` and no password required.

---

### Read the Flag

```bash
sudo emacs flag.txt
```

Opening the file as root via `emacs` bypasses the permission restriction and reveals the flag directly in the editor.