import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  timeSlotDiv: {
    marginTop: '5%',
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
});

const TimeSlotSelection = (props) => {
  const styles = useStyles();

  return (
    <div className="col-xs-12 col-md-3 pr-0">
      {/* <Grid container alignItems={'center'} direction="row" className={styles.timeSlotDiv}> */}
     
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
