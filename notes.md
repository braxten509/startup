## Contents can be used during midterm/final!

Basic Git commands are:
```
git fetch → Gets changes but doesn’t change your program in VS
get status → Shows what commits *can* be added to VS
git pull → Commits the new changes to VS
git push → Pushes VS to Github
git commit -am "commit message" → Commits to Github
```

Shortcuts
```
Ctrl/Cmnd+Shift+V -> See page in markdown format
```

Start Server
```
in startup/service, run:
node index.js

in startup, run:
npm run dev
```

Operator Commands
```
./deployService.sh -k ~/Documents/keys/production.pem -h psbhrfront.click -s simon -> Deploy to simon demo to server
./deployService.sh -k ~/Documents/keys/production.pem -h psbhrfront.click -s startup -> Deploy to startup subdomain
ssh -i ~/Documents/keys/production.pem ubuntu@psbhrfront.click -> access the server after deployment (running node index.js can say if there's an error)
(go to services -> startup -> node index.js to see errors)
```

Important Debugging Tips
```
ssh into your server. Run "pm2 stop startup". Then cd "services/startup" and run the back end "node index.js". See if there are any errors.

It looks like some people are running the "npm install mongodb" in the directory above service.  If you do this, it will work on your development environment, but when you deploy, it will fail with a 502 error.  Make sure your package.json in the service directory has mongodb in it.

Use this alert to figure out what is being returned to fix it:
const data = await response.json(); // if this is how you are getting your data
alert(JSON.stringify(data.link.link, null, 2));
```

HTML Structure Tags (primary)
```
<head>
<body>
- <header>
- <nav>
- <main>
- <footer>
```

HTML Simple Tags
```
<table>, <tr>, <th>, <td> -> respectively, table organizer, table row, table header, table data
<button> -> allows you to create an interactable object on screen
<a href=""> -> allows you to create a link
```

[Readme](README.md)