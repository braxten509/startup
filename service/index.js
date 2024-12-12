const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// * MIDDLEWARE * //
app.use(express.json()); // middleware that converts received JSON to a javascript object
app.use(cookieParser()); // use the cookie parser middleware for tracking authentication tokens
app.use(express.static('public')); // serve up the front-end static content hosting

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// * ROUTER CUSTOM FUNCTIONS (CUSTOM MIDDLEWARE) * //
/* 
   - req is request from the client and response is reponse to the client
   - req.body gets the 'body' JSON tag from the request sent by the client
   - thus .email is the email tag under body
*/

// apiRouter.post('/auth/logCellData', async (req, res) => {
//     const { id, name, dateAndTime, location } = req.body;
//     cells[id] = {
//         id,
//         name,
//         dateAndTime,
//         location
//     };
//     console.log(`Updated/Created cell id ${id} with name \'${name}\', date \'${dateAndTime}\', and location \'${location}\'`);
// });


apiRouter.post('/link/generate', async (req, res) => {

    const email = req.body.email;
    const link = await DB.generateLink(email);

    res.status(200).send({
        link: link
    });
    
});

apiRouter.get('/link/get', async (req, res) => {

    const gottenLink = await DB.getLink(req.query.email);

    if (gottenLink) {
        res.status(200).send({ link: gottenLink });
    } else {
        res.status(200).send({ link: '' });
    }
});

apiRouter.post('/auth/create', async (req, res) => {

    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.email, req.body.password);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.status(201).send({
            id: user._id,
        });
    }

    // const user = users[req.body.email];

    // if (user) { // if exists
    //     res.status(409).send({ msg: 'Existing user'})
    //     /* Sends this JSON with this data and HTTP status code of 409 - conflict
    //         {
    //             "msg": "Existing user"
    //         } 
    //     */
    // } else { // if doesn't exist

    //     const user = { // create user var
    //         email: req.body.email, 
    //         password: req.body.password, 
    //         token: uuid.v4() 
    //     };

    //     users[user.email] = user; // add user to database under email

    //     res.status(201).send({ token: user.token}); // will send a positive HTTP code
    /* Sends this JSON
        {
            "token": user.token
        } 
    */
    // }
});

// login existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });

    // const user = users[req.body.email]; /* using the email as a key to retrieve whole user object under that email */

    // if (user && req.body.password === user.password) { // if user exists and password entered is same as
    //     user.token = uuid.v4(); // updates token in user object to a new token so it is ONLY valid for that session
    //     res.send({ token: user.token });
    //     /* Sends this JSON
    //         {
    //             "token": user.token
    //         } 
    //     */
    //     return;
    // }
    // res.status(401).send({ msg: "Unauthrorized" });
    // /* Otherwise, sends with HTTP code 401:
    //     {
    //         "msg": "Unauthroized"
    //     } 
    // */
});

// logout a user
apiRouter.delete('/auth/logout', (req, res) => {

    res.clearCookie(authCookieName);
    res.status(204).end();

    // const user = Object.values(users).find((u) => u.token === req.body.token);
    // /*
    // - Object.values(users) converts the users object into an array of user objects
    // - .find() searches through this array
    // - (u) => u.token === req.body.token is the search condition that:
    //     - Takes each user object (u)
    //     - Checks if that user's token matches the token from the request body 
    // */

    // if (user) { // deletes user token if user token exists
    //     delete user.token;
    // }

    // res.status(204).end(); // use .end() when sending an empty response back to the client
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

peerProxy(httpService);