import React, { useState } from 'react';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const SearchBox = ({ onSearch, onChangeSearchTerm }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const onChange = (e) => {
        setSearchTerm(e.target.value);
        onChangeSearchTerm(e.target.value);
    }

    return (
        <div>
            <TextField
                value={searchTerm}
                variant='outlined'
                onChange={onChange}
                autoFocus={true}
                style={{padding: 0, width: '500px'}}
            />
        </div>
    );
}

export default SearchBox;