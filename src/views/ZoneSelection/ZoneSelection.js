import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 }
];

const useStyles = makeStyles(() => ({
  slotheader: {
    display: "flex",
    alignItems: "center"
}
}));

const ZoneSelection = () => {

  const classes = useStyles();
  
  return (
      <div className={`row ${classes.slotheader} mb-4 mt-4`}>
        <div className="col-6 col-md-3 dropdown">
        <Autocomplete
                id="zone-combo-box"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Zone Name" variant="outlined" />}
              />
        </div>
        <div className="col-6 col-md-3 dropdown">
          <Autocomplete
                id="site-combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Site Name" variant="outlined" />}
              />
        </div>
        <div className="col-12 col-md-2 text">
          Name : {'Velankadu Buriel'}
        </div>
        <div className="col-12 col-md-2 text">
          Contact : {'123456789'}
        </div>
        <div className="col-12 col-md-2 text">
          Address : {'Anna Nagar East'}
        </div>
      </div>
  )
}

export default ZoneSelection;