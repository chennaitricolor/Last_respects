import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  timeSlotDiv: {
    marginTop: '5%',
  },
  marginRight: {
    marginRight: '2%',
  },
  timeSlotWrapper: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    height: '100%',
    maxHeight: 1000,
    overflow: 'auto',
  },
  timeSlot: {
    padding: '10px 15px',
    marginRight: '16px',
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  timeSlotBooked: {
    border: '1px solid #EB5757',
    background: '#EB5757',
    opacity: '80%',
  },
  timeSlotAvailable: {
    border: '1px solid #27AE60',
    background: '#27AE60',
  },
});

const TimeSlotSelection = (props) => {
  const styles = useStyles();

  let timeSlotArray =
    props.dateTimeSlotDetails !== null && props.selectedDate !== null ? Object.keys(props.dateTimeSlotDetails[props.selectedDate]) : [];

  const isSlotAvailable = (time) => {
    let timeSlots = props.dateTimeSlotDetails[props.selectedDate];
    return JSON.stringify(timeSlots[time]) === JSON.stringify({});
  };

  const selectTime = (time) => {
    let type = isSlotAvailable(time) ? 'ADD' : 'EDIT';
    let slotDetails = null;
    if (
      props.dateTimeSlotDetails !== null &&
      props.dateTimeSlotDetails[props.selectedDate] !== null &&
      props.dateTimeSlotDetails[props.selectedDate][time] !== null
    ) {
      slotDetails = props.dateTimeSlotDetails[props.selectedDate][time];
    }
    let openSlotForm = {
      date: props.selectedDate,
      time,
      type,
      slotDetails,
    };
    props.openSlotForm(openSlotForm);
  };

  return (
    <div className="col-xs-12 col-md-3 pr-0">
      <ul className={`${styles.timeSlotWrapper}`}>
        {timeSlotArray.map((time, index) => {
          return (
            <li
              key={index}
              className={clsx(styles.timeSlot, isSlotAvailable(time) ? styles.timeSlotAvailable : styles.timeSlotBooked)}
              onClick={() => selectTime(time)}
            >
              {time}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TimeSlotSelection.propTypes = {
  dateTimeSlotDetails: PropTypes.object,
  selectedDate: PropTypes.string,
  openSlotForm: PropTypes.func,
};

export default TimeSlotSelection;
