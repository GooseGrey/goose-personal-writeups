# CyLab - "My Git"
## General Skills - Easy

This challenge has you interact with Git configuration to push a file as a specific user and retrieve the flag.

---

### Getting the Repo

Start by cloning the repository using the command provided in the instructions. Then open the `README.md` file, which reveals the following:

```markdown
# MyGit
### If you want the flag, make sure to push the flag!
Only flag.txt pushed by `root:root@picoctf` will be updated with the flag.
GOOD LUCK!
```

The goal is clear: push a `flag.txt` file **as the user `root` with the email `root@picoctf`**.

---

### Configuring the Git User

The main part here is setting the correct Git identity, you can do it directly with :

```bash
nano .git/config
```

Then add the following block under the existing content:

```ini
[user]
    name = root
    email = root@picoctf
```

Alternatively, the cli syntax is:

```bash
git config user.name "root"
git config user.email "root@picoctf"
```

---

### Pushing the Flag

Once the user is configured correctly, create and push the file:

```bash
touch flag.txt
git add flag.txt
git commit -m "New file !!!"
git push
```

The flag will appear directly in the **output of the `git push` command** as the server processes the push. Keep an eye on the terminal response!