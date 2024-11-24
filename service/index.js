const express = require('express');
const uuid = require('uuid');
const app = express();

// users are saved in memory and are erased upon restart of service
let users = {};

const port = process.argv.length > 2 ? process.argv[2] : 3000;

// * MIDDLEWARE * //
app.use(express.json()); // middleware that converts received JSON to a javascript object
app.use(express.static('public')); // serve up the front-end static content hosting

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// * ROUTER CUSTOM FUNCTIONS (CUSTOM MIDDLEWARE) * //
/* 
   - req is request from the client and response is reponse to the client
   - req.body gets the 'body' JSON tag from the request sent by the client
   - thus .email is the email tag under body
*/
apiRouter.post(`/auth/create`, async (req, res) => {
    const user = users[req.body.email];

    if (user) { // if exists
        res.status(409).send({ msg: 'Existing user'})
        /* Sends this JSON with this data and HTTP status code of 409 - conflict
            {
                "msg": "Existing user"
            } 
        */
    } else { // if doesn't exist

        const user = { // create user var
            email: req.body.email, 
            password: req.body.password, 
            token: uuid.v4() 
        };

        users[user.email] = user; // add user to database under email

        res.status(201).send({ token: user.token}); // will send a positive HTTP code
        /* Sends this JSON
            {
                "token": user.token
            } 
        */
    }
});

// login existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.email]; /* using the email as a key to retrieve whole user object under that email */
    
    if (user && req.body.password === user.password) { // if user exists and password entered is same as
        user.token = uuid.v4(); // updates token in user object to a new token so it is ONLY valid for that session
        res.send({ token: user.token });
        /* Sends this JSON
            {
                "token": user.token
            } 
        */
        return;
    }
    res.status(401).send({ msg: "Unauthrorized" });
    /* Otherwise, sends with HTTP code 401:
        {
            "msg": "Unauthroized"
        } 
    */
});

// logout a user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    /*
    - Object.values(users) converts the users object into an array of user objects
    - .find() searches through this array
    - (u) => u.token === req.body.token is the search condition that:
        - Takes each user object (u)
        - Checks if that user's token matches the token from the request body 
    */

    if (user) { // deletes user token if user token exists
        delete user.token;
    }

    res.status(204).end(); // use .end() when sending an empty response back to the client
});