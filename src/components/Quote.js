import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useParams, useHistory } from 'react-router-dom';
import logo from '../assets/images/mustache.png';
import quoteService from '../services/memory.quotes';

import { makeStyles } from '@material-ui/core/styles';
import './Quote.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
}));

const defaultQuote = {
    author: '',
    text: '',
    source: ''
};

const defaultState = {
    quote: defaultQuote,
    errors: {}
}

const Quote = ({ match }) => {
    const { id } = useParams();
    const history = useHistory();
    const [state, setState] = useState(defaultState);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async (id) => await quoteService.get(id);
        if (id) {
            const quote = fetchData(id);
            setState({ ...state, quote });
        }
    }, [id, state]);

    const isValid = (quote) => {
        if (quote.text) {
            return { valid: true, errors: {}}
        } else {
            return { valid: false, errors: { text: 'Please enter some text'}}
        }
    }

    const handleSubmit = () => {
        const { quote } = state;
        const {valid, errors} = isValid(quote);
         if (valid) {
            quoteService.save(quote);
            setState({...state, errors});
            // history.push('/');
        } else {
            setState({...state, errors});
        }
    };

    const onChange = (e) => {
        setState({
            ...state,
            quote: {
                ...state.quote,
                [e.target.name]: e.target.value
            }
        });
    }

    const actions = [
        <Button
            color='secondary'
            href='/'
        >Cancel</Button>,
        <Button
            color='primary'
            onClick={handleSubmit}
        >Submit</Button>,
    ];

    return (
        <div>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <form className={classes.root}>
                    <div className='field'>
                        <TextField id='quoteText'
                            name='text'
                            error = {state.errors && state.errors.text}
                            helperText = {state.errors && state.errors.text}
                            label='Text' multiLine
                            rowsMax={5}
                            multiline
                            autoFocus
                            required
                            value={state.quote && state.quote.text}
                            onChange={onChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </div>
                    <div className='field'>
                        <TextField id='quoteAuthor'
                            name='author'
                            label='Author'
                            value={state.quote && state.quote.author}
                            onChange={onChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </div>
                    <div className='field'>
                        <TextField id='quoteSource'
                            name='source'
                            label='Source'
                            value={state.quote && state.quote.source}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={onChange}
                        />
                    </div>
                </form>
                <div>{actions}</div>
            </header>
        </div>
    );
}

export default Quote;