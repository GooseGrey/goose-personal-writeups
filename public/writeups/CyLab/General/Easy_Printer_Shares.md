# CyLab - "Printer Shares"
## General Skills - Easy

This challenge introduces the SMB protocol, commonly used by printers and devices to share files over a network.

---

### Get the Tools

Install `smbclient`, a command-line tool for interacting with SMB shares:

```bash
sudo apt install smbclient
```

---

### List the Shares

Start by listing the available shares on the server:

```bash
smbclient -L //mysterious-sea.picoctf.net -p 63745
```

This returns the following:

```
Sharename       Type      Comment
---------       ----      -------
shares          Disk      Public Share With Guests
IPC$            IPC       IPC Service (Samba 4.19.5-Ubuntu)
```

The `shares` share looks promising.

---

### Get the Flag

Connect to the share and browse its contents (classic ls, cd commands):

```bash
smbclient //mysterious-sea.picoctf.net/shares -p 63745
```

A `flag.txt` file is sitting right there. Download it with:

```bash
get flag.txt
```

Then read it locally to get the flag:

```bash
cat flag.txt
```