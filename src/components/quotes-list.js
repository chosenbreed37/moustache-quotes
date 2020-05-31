import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const QuotesList = ({ quotes }) => {
  return (
    <List style={{marginLeft: 'auto', marginRight: 'auto', width: '500px'}}>
      {
        quotes.map((quote, i) => <ListItem key={i}>
          <Link to={`/quote/${quote.id}`}><ListItemText secondary={quote.author} primary={'"' + quote.text + '"'} /></Link>
        </ListItem>)
      }
    </List>
  );
};

export default QuotesList;