
import * as firebase from 'firebase/app';
import 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
const quotes = require('./services/quotes.json');

require('dotenv').config();

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;

const config = {
    apiKey,
    projectId,
    databaseURL: `https://${projectId}.firebaseio.com`,
    authDomain: `${projectId}.firebaseapp.com`,
    storageBucket: `${projectId}.appspot.com`,
};

console.log('>>> Running dabatabase initialisation script...');
console.log(config);

// Initialize Firebase
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

const guid = () => uuidv4();

const clear = async () => {
    await database
        .ref('/quotes')
        .remove();
}

const add = (quote) => {
    return new Promise((resolve, reject) => {
        const id = guid();
        const newQuote = { ...quote, id };

        database.ref('quotes/' + id)
            .set(newQuote, (error) => {
                if (error) {
                    console.log('>>> failed to add quote: ', error);
                    reject(error);
                } else {
                    console.log('>>> added quote: ', newQuote);
                    resolve(newQuote);
                }
            })
    });
};

const init = () => {
    quotes.forEach(add);
}

console.log('>>> Clear the collection...');
clear();

console.log('>>> Initialise the collection...');
init();

console.log('>>> init complete.');
