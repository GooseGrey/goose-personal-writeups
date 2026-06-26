# CyLab - "Old Sessions"
## Web Exploitation - Easy

---

### Register an Account

Register with any credentials and log in. You'll land on a forum page with an interesting message hinting to check the sessions page.

![Forum page](./img/writeups/old_session_1.png)

Navigate to:

```
http://dolphin-cove.picoctf.net:<PORT>/sessions
```

---

### Hijack the Admin Session

The sessions page lists all active sessions — including an admin one with its session cookie exposed.

![Session page](./img/writeups/old_session_2.png)

Open the browser's **DevTools → Storage → Cookies** and replace your session cookie value with the admin's.

Refresh the forum page and the flag is there!