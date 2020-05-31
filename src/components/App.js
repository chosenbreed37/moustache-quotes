import React, { Component, useState } from 'react';
import logo from '../assets/images/mustache.png';
import './App.css';
import QuotesList from './quotes-list';
import Quote from './Quote';
import SearchBox from './search-box';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import quoteService from '../services/firebase.quotes';

const Home = () => {
  const [state, setState] = useState({ term: '', quotes: [] });

  const search = async (searchTerm) => {
    try {
      const quotes = await quoteService.getSome(searchTerm);
      setState({ ...state, quotes });
    } catch (err) {
      console.log(err);
    }
  }

  const onChangeSearchTerm = (term) => {
    setState({ ...state, term });
  }

  const onSubmit = (evt) => {
    search(state.term);
    evt && evt.preventDefault();
  }

  return (
    <div>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <form onSubmit={onSubmit}>
          <SearchBox onChangeSearchTerm={onChangeSearchTerm} />
          <Button
            color='primary'
            onClick={onSubmit}
        >Search</Button>
        </form>
      <QuotesList quotes={state.quotes} />
        </header>

    </div>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Switch>
            <Route path={['/quote/:id', '/quote']}>
              <Quote />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
