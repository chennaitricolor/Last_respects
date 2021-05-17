import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { getSiteList, getZoneList } from '../../utils/CommonUtils';

const useStyles = makeStyles(() => ({

}));

const ZoneSelection = () => {

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 }
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 ">
        <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Zone Name" variant="outlined" />}
              />
        </div>
        <div className="col-6 ">
          <label>Site Name</label>
          <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Site Name" variant="outlined" />}
              />
        </div>
        <div className="col-12 ">
          <ul>
            <li className="col-md-4"> <label>Site Name : </label>
              <span>{""} </span>
            </li>

            <li> <label className="col-md-4">Contact : </label>
              <span>{""} </span>
            </li>

            <li> <label className="col-md-4">Address : </label>
              <span>{""} </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )

}

export default ZoneSelection;
