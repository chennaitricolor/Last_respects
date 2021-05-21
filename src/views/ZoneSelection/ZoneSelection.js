import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  slotHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  dropDownLabel: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#000000',
    marginBottom: '2%',
  },
  dropDown: {
    width: '94%',
    marginTop: '3%',

    '& label': {
      color: '#707070 !important',
      fontSize: '16px',
      display: 'contents',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  dropDownSelect: {
    fontSize: '16px',
    height: '40px',
    marginTop: '3%',
    backgroundColor: '#fff',

    '& div': {
      fontSize: '16px',
      color: '#4F4F4F',
    },
  },
}));

const ZoneSelection = (props) => {
  const styles = useStyles();

  return (
    <div className={`row ${styles.slotHeader} mb-4 mt-4`}>
      <div className={`col-6 col-md-3 dropdown`}>
        <Typography className={styles.dropDownLabel} component={'div'}>
          Zone
        </Typography>
        <FormControl className={styles.dropDown}>
          <Select
            variant={'outlined'}
            size={'small'}
            className={styles.dropDownSelect}
            value={props.siteDetails.zoneName}
            onChange={(e) => props.handleOnChangeForDropdown(e.target.value, 'zoneName')}
          >
            {props.zoneList.map((item) => {
              return (
                <MenuItem key={item.zone_or_division_id} value={item.zone_or_division}>
                  {item.zone_or_division}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="col-6 col-md-3 dropdown">
        <Typography className={styles.dropDownLabel} component={'div'}>
          Site
        </Typography>
        <FormControl className={styles.dropDown}>
          <Select
            variant={'outlined'}
            size={'small'}
            className={styles.dropDownSelect}
            value={props.siteDetails.siteName}
            onChange={(e) => props.handleOnChangeForDropdown(e.target.value, 'siteName')}
          >
            {props.siteList.map((item) => {
              return (
                <MenuItem key={item.id} value={item.site_name}>
                  {item.site_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="col-12 col-md-2 text">Name : {'Velankadu Buriel'}</div>
      <div className="col-12 col-md-2 text">Contact : {'123456789'}</div>
      <div className="col-12 col-md-2 text">Address : {'Anna Nagar East'}</div>
    </div>
  );
};

ZoneSelection.propTypes = {
  siteDetails: PropTypes.object,
  zoneList: PropTypes.array,
  siteList: PropTypes.array,
  handleOnChangeForDropdown: PropTypes.func,
};

export default ZoneSelection;
