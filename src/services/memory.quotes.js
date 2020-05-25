const quotes = require('./quotes.json');

const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

const getAll = () => Promise.resolve(quotes);

const matchText = (quote, q) => quote.text && quote.text.toUpperCase().includes(q);
const matchAuthor = (quote, q) => quote.author && quote.author.toUpperCase().includes(q);
const matchSource = (quote, q) => quote.source && quote.source.toUpperCase().includes(q);

const match = (quote, searchTerm) => {
    const q = searchTerm.toUpperCase();
    return matchText(quote, q)
        || matchAuthor(quote, q)
        || matchSource(quote, q);
}

const getSome = (searchTerm) => {
    var subset = quotes.filter(quote => match(quote, searchTerm));
    return Promise.resolve(subset);
}

const add = (quote) => {
    var id = guid();
    var newQuote = { ...quote, id };
    quotes.push(newQuote);
    console.log('>>> added quote: ', newQuote)
    return Promise.resolve(newQuote);
};

const update = (quote) => {
    const source = get(quote.id);
    source.text = quote.text;
    source.author = quote.author;
    source.source = quote.source;
    return Promise.resolve();
}

const get = (id) => {
    console.log('>>> get: ', id);
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
