import * as firebase from 'firebase/app';
import 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;

const config = {
    apiKey,
    projectId,
    databaseURL: `https://${projectId}.firebaseio.com`,
    authDomain: `${projectId}.firebaseapp.com`,
    storageBucket: `${projectId}.appspot.com`,
};

// Initialize Firebase
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

const guid = () => uuidv4();

const toArray = (object) => {
    const entries = [];
    if (object) {

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                // do stuff
                entries.push(object[property]);
            }
        }
    }
    return entries;
}

const getAll = () => {
    return new Promise((resolve, _) => {
        database
            .ref('/quotes')
            .once('value')
            .then((snapshot) => {
                const quotes = toArray(snapshot.val());
                console.log('>>> retrieve quotes: ', quotes);
                resolve(quotes);
            });

    });
}

const matchText = (quote, q) => quote.text && quote.text.toUpperCase().includes(q);
const matchAuthor = (quote, q) => quote.author && quote.author.toUpperCase().includes(q);
const matchSource = (quote, q) => quote.source && quote.source.toUpperCase().includes(q);

const match = (quote, searchTerm) => {
    const q = searchTerm.toUpperCase();
    return matchText(quote, q)
        || matchAuthor(quote, q)
        || matchSource(quote, q);
}

const getSome = async (searchTerm) => {
    const quotes = await getAll();
    var subset = quotes.filter(quote => match(quote, searchTerm));
    return Promise.resolve(subset);
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

const update = (quote) => {
    const source = get(quote.id);
    source.text = quote.text;
    source.author = quote.author;
    source.source = quote.source;
    return Promise.resolve();
}

const get = async (id) => {
    console.log('>>> get: ', id);
    const quotes = await getAll();
    const quote = quotes.find(q => q.id === id);
    return Promise.resolve(quote);
}

const save = (quote) => {
    console.log('>>> saving: ', quote);
    if (quote.id) {
        return update(quote);
    } else {
        return add(quote);
    }
}

export default {
    getAll,
    getSome,
    add,
    save,
    update,
    get
};
