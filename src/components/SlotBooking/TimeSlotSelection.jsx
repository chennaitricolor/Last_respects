import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  timeSlotDiv: {
    marginTop: '5%',
  },
  timeSlotTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000',
  },
  informationLegend: {
    width: '24px',
    maxWidth: '24px',
    height: '8px',
    borderRadius: '3px',
    marginRight: '2%',
  },
  bookedColor: {
    background: '#EB5757',
  },
  availableColor: {
    background: '#219653',
  },
  marginRight: {
    marginRight: '2%',
  },
  timeSlotWrapper: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    height: "100%",
    maxHeight: 1000,
    overflow: "auto"
  },
  timeSlot: {
    padding: '10px 15px',
    backgroundColor: '#ff0000',
    borderBottom: '2px solid #ccc',
    color: '#F2F2F2'
  },
  rowFullWidth: {
    width: "100%",
  },
});

const TimeSlotSelection = (props) => {
  const styles = useStyles();

  return (
    <div className="col-xs-12 col-md-3 pr-0">
      {/* <Grid container alignItems={'center'} direction="row" className={styles.timeSlotDiv}> */}
     <div className={`row ${styles.rowFullWidth}`}>
        <div className='col-6'>
          <h6 className="mt-4">Time Slots</h6>
        </div>
          {/* <Grid item md={4} style={{ width: '35%' }}>
            <Typography className={styles.timeSlotTitle}>Time Slots</Typography>
          </Grid> */}
        <div className='col-3'>
          <Grid item md={2} className={styles.informationLegend + ' ' + styles.bookedColor} />
          <Grid item md={2} className={styles.marginRight}>
            {'Booked'}
          </Grid>
        </div>
        <div className='col-3'>
          <Grid item md={2} className={styles.informationLegend + ' ' + styles.availableColor} />
          <Grid item md={2} className={styles.marginRight}>
            {'Available'}
          </Grid>
        </div>
      </div>
        <ul className={`${styles.timeSlotWrapper}`}>
          <li className={`${styles.timeSlot}`}>
            8:00 AM to 8:45 AM
                </li>
          <li className={`${styles.timeSlot}`}>
            9:00 AM to 9:30 AM
                </li>
          <li className={`${styles.timeSlot}`}>
            9:30 AM to 10:15 AM
                </li>
          <li className={`${styles.timeSlot}`}>

            10:15 AM to 11.00 AM
                </li>
          <li className={`${styles.timeSlot}`}>
            8:00 AM to 8:45 AM
                </li>
          <li className={`${styles.timeSlot}`}>
            9:00 AM to 9:30 AM
                </li>
          <li className={`${styles.timeSlot}`}>
            9:30 AM to 10:15 AM
                </li>
          <li className={`${styles.timeSlot}`}>

            10:15 AM to 11.00 AM
                </li>
        </ul>
      {/* </Grid> */}
    </div>
  );
};

// TimeSlotSelection.propTypes = {};

export default TimeSlotSelection;
