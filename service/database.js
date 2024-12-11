const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('startup');
const userCollection = db.collection('user');
const linkCollection = db.collection('link');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

function getLink(email) {
  return linkCollection.findOne({ email: email});
}

async function generateLink(email) {
  const random_link = generateRandomLink();

  await linkCollection.updateOne(
    { email: email},
    { $set: { link: random_link } },
    { upsert: true }
  );
  return random_link;
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

// async function addScore(score) {
//   return scoreCollection.insertOne(score);
// }

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

function generateRandomLink() {
  let link = "";

  for (let i = 0; i < 10; i++) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      link += alphabet[Math.floor(Math.random() * alphabet.length)]; // AI made the math
  }

  link = "https://" + link + ".psbhrfront.click/";
  
  return link;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  generateLink,
  getLink
};
