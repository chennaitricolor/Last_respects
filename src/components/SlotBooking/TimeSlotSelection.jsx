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
});

const TimeSlotSelection = (props) => {
  const styles = useStyles();

  return (
    <Grid container alignItems={'center'} direction="row" className={styles.timeSlotDiv}>
      <Grid item md={4} style={{ width: '35%' }}>
        <Typography className={styles.timeSlotTitle}>Time Slots</Typography>
      </Grid>
      <Grid item md={2} className={styles.informationLegend + ' ' + styles.bookedColor} />
      <Grid item md={2} className={styles.marginRight}>
        {'Booked'}
      </Grid>
      <Grid item md={2} className={styles.informationLegend + ' ' + styles.availableColor} />
      <Grid item md={2} className={styles.marginRight}>
        {'Available'}
      </Grid>
    </Grid>
  );
};

// TimeSlotSelection.propTypes = {};

export default TimeSlotSelection;
