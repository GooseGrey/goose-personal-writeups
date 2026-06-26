# CyLab - "Inspect HTML"
## Web Exploitation - Easy

### Login Page Test

To understand how the page works, it's always helpful to observe how it reacts to user input. A good starting point is to try simple credentials like `admin` with a random password.  

As expected, the login attempt fails and redirects us to a **"Login Failed"** page.  
It could be interesting to inspect this page to see if we can gather information about the authentication process. Indeed, we can find a script embedded in the HTML.

![Inspect HTML](./img/writeups/Local_Authority_1.png)

### Analyze the Script

By reading the script, we can see that it is responsible for validating the login inputs and that it calls a `checkPassword()` function.  
We can also notice that the HTML file loads a `secure.js` script, which is likely worth investigating.

Let's try to view the contents of this "secure" file. Go to the **"Debugger"** section of the browser's developer tools and open the corresponding file.

![Debugger section of inspector](./img/writeups/Local_Authority_2.png)

We can see that this file simply checks for a hardcoded `(username, password)` pair.  
We can use these credentials to log in and retrieve the flag!